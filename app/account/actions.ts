"use server";
import {
  updateUserImageSchema,
  updateUsernameSchema,
} from "@/app/account/schema";
import { auth, signIn, updateUser } from "@/auth";
import { db, Invader, ReviewTask } from "@/db";
import { contributions } from "@/db/schema/contributions";
import { invaders } from "@/db/schema/invaders";
import { referralLinks } from "@/db/schema/referral_links";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { users } from "@/db/schema/users";
import { canReviewOwnContribution } from "@/lib/utils";
import { getTag } from "@/utils/revalidation-tags";
import { createFetchRequester } from "@algolia/requester-fetch";
import { del, put } from "@vercel/blob";
import algoliasearch from "algoliasearch";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { wait } from "next/dist/lib/wait";

export const updateUsername = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  const data = Object.fromEntries(formData);
  const safeData = updateUsernameSchema.safeParse(data);
  if (!safeData.success)
    return { success: false, errors: safeData.error.flatten().fieldErrors };
  // TODO use just updateUser from next-auth once its stable
  // await updateUser({
  //   ...session,
  //   user: { ...session.user, ...safeData.data },
  // });
  await db
    .update(users)
    .set(safeData.data)
    .where(eq(users.id, session.user.id))
    .returning()
    .then((res) => res[0]);
  await updateUser({});
  return safeData;
};

export const deleteImageFromVercel = async (url: string) => {
  const oldImageurl = new URL(url);
  const rootDomain = oldImageurl.host
    .split(".")
    .reverse()
    .splice(0, 2)
    .reverse()
    .join(".");
  if (rootDomain === "vercel-storage.com") {
    await del(oldImageurl.href);
  }
};

export const updateAvatar = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  const image = formData.get("image");
  const safeData = updateUserImageSchema.safeParse(image);
  if (!safeData.success)
    return { success: false, errors: safeData.error.flatten().fieldErrors };
  const fileName = `${session.user.name}.${safeData.data.type.split("/")[1]}`;
  if (session.user.image) await deleteImageFromVercel(session.user.image);
  const putRes = await put(`users/avatar/${fileName}`, safeData.data, {
    access: "public",
  });
  await db
    .update(users)
    .set({ image: putRes.url })
    .where(eq(users.id, session.user.id));
  await updateUser({});
  return safeData;
};

export const deleteAvatar = async (_formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  if (!session.user.image) return;
  await deleteImageFromVercel(session.user.image);
  void (await db
    .update(users)
    .set({ image: null })
    .where(eq(users.id, session.user.id)));
  void (await updateUser({}));
};

export const createReferralLink = async (
  _prevState: any,
  _formData: FormData
) => {
  const session = await auth();
  if (!session) return signIn();
  await db.insert(referralLinks).values({ referrer_id: session.user.id });
  void (await updateUser({}));
  return { success: true, errors: [] };
};

export const deleteContribution = async (id: ReviewTask["id"]) => {
  const session = await auth();
  if (!session) return signIn();
  const contribution = await db.query.reviewTasks.findFirst({
    where: eq(reviewTasks.id, id),
  });
  if (!contribution || contribution.editor_id !== session.user.id)
    return { success: false };
  await deleteImageFromVercel(contribution.proof_image);
  await db.delete(reviewTasks).where(eq(reviewTasks.id, id));
  revalidateTag(getTag("review", id.toString()));
  await wait(1);
  revalidateTag(getTag("all reviews"));
};

export const acceptContribution = async (id: ReviewTask["id"]) => {
  const session = await auth();
  if (!session) return signIn();
  const contribution = await db.query.reviewTasks.findFirst({
    where: eq(reviewTasks.id, id),
    with: {
      entity: true,
      editor: true,
    },
  });
  if (
    !contribution ||
    (contribution.editor_id === session.user.id &&
      !canReviewOwnContribution(session.user.role))
  ) {
    return { success: false };
  }

  const { entity, change, proof_image, entity_id, editor_id, editor } =
    contribution;

  if (process.env.NODE_ENV !== "development") {
    const searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
      process.env.ALGOLIA_ADMIN_API_KEY!,
      { requester: createFetchRequester() }
    );
    const index = searchClient.initIndex("invaders");
    const found = await index.search<Invader>(entity.name);
    const algoliaItem = found.hits.find(
      (invader) => invader.name === entity.name
    );
    if (!algoliaItem) {
      return { success: false };
    }
    const algoliaUpdateRes = await index.partialUpdateObject({
      objectID: algoliaItem.objectID,
      [change.field]: change.value,
    });
    if (!algoliaUpdateRes.objectID) {
      return { success: false };
    }
  }

  const newValue =
    change.field === "create_date" ? new Date(change.value) : change.value;
  const toUpdate: Partial<Invader> = {
    [change.field]: newValue,
  };
  if (change.field === "state")
    toUpdate.images = [
      ...entity.images,
      { url: proof_image, author: editor.name },
    ];
  else {
    await deleteImageFromVercel(proof_image);
  }

  try {
    await db.transaction(async (tx) => {
      await tx.update(invaders).set(toUpdate).where(eq(invaders.id, entity_id));
      await tx.delete(reviewTasks).where(eq(reviewTasks.id, id));
      await tx.insert(contributions).values({
        entity_id: entity_id,
        editor_id: editor_id,
        reviewer_id: session.user.id,
        type: "edit",
        data: toUpdate,
      });
    });
  } catch (err) {
    return { success: false };
  } finally {
    revalidateTag(getTag("review", id.toString()));
    await wait(1);
    revalidateTag(getTag("all reviews"));
    await wait(1);
    revalidateTag(getTag("invader", entity.name));
    await wait(1);
    revalidateTag(getTag("invader history", entity.id.toString()));
  }
};
