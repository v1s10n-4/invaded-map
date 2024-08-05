"use server";
import {
  updateUserImageSchema,
  updateUsernameSchema,
} from "@/app/account/schema";
import { auth, signIn, updateUser } from "@/auth";
import { db, Invader, ReviewTask, User } from "@/db";
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

export const createReferralLink = async (formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  await db.insert(referralLinks).values({ referrer_id: session.user.id });
  void (await updateUser({}));
  return { success: true };
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

  if (process.env.NODE_ENV !== "development") {
    const searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
      process.env.ALGOLIA_ADMIN_API_KEY!,
      { requester: createFetchRequester() }
    );
    const index = searchClient.initIndex("invaders");
    const found = await index.search<Invader>(contribution.entity.name);
    const algoliaItem = found.hits.find(
      (invader) => invader.name === contribution.entity.name
    );
    if (!algoliaItem) {
      console.log("algolia error");
      return { success: false };
    }
    const algoliaUpdateRes = await index.partialUpdateObject({
      objectID: algoliaItem.objectID,
      [contribution.change.field]: 20, //contribution.change.value
    });
    if (!algoliaUpdateRes.objectID) {
      return { success: false };
    }
  }

  const toUpdate: Partial<Invader> = {
    [contribution.change.field]: contribution.change.value,
  };
  if (contribution.change.field === "state")
    toUpdate.images = [
      ...contribution.entity.images,
      { url: contribution.proof_image, author: contribution.editor.name },
    ];
  else {
    await deleteImageFromVercel(contribution.proof_image);
  }
  const res = await db
    .update(invaders)
    .set(toUpdate)
    .where(eq(invaders.id, contribution.entity_id));
  if (res.rowCount !== 1) return { success: false };

  await db.delete(reviewTasks).where(eq(reviewTasks.id, id));
  revalidateTag(getTag("review", id.toString()));
  await wait(1);
  revalidateTag(getTag("all reviews"));
  await wait(1);
  revalidateTag(getTag("invader", contribution.entity.name));
};
