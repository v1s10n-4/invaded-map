"use server";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  sizeInMB,
  updateUserImageSchema,
  updateUsernameSchema,
} from "@/app/account/schema";
import { auth, signIn, updateUser } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { del, put } from "@vercel/blob";
import { eq } from "drizzle-orm";

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
