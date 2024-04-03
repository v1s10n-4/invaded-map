"use server";
import { auth, signIn, signOut } from "@/auth";
import { db } from "@/db";
import { getTag, TagName, tags } from "@/utils/revalidation-tags";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { revalidateTag } from "next/cache";

export type TagNameFormEntry = TagName | File | null;
export const signin = async () => {
  const res = await signIn();
};

export const signout = async () => {
  await signOut();
};
export const deleteUser = async () => {
  const session = await auth();
  const adapter = DrizzleAdapter(db);
  if (session?.user?.id && adapter.deleteUser) {
    const res = await adapter.deleteUser(session.user.id);
    console.log(res);
  }
};

export const invalidateTag = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session || session.user.role !== "superuser")
    return { message: "Unauthorized revalidation", error: true };
  console.log(Object.fromEntries(formData.entries()));
  const tagName = formData.get("tag") as TagNameFormEntry;
  if (tagName === null || tagName instanceof File)
    return { message: "Missing tag", error: true };
  if (!tags[tagName]) return { message: "Tag does not exist", error: true };
  if (typeof tags[tagName] === "function") {
    const specific = formData.get("specific");
    if (!specific || specific instanceof File)
      return { message: "Missing tag param", error: true };
    revalidateTag(getTag(tagName, specific));
    return { message: "Success", error: false };
  } else {
    revalidateTag(tagName);
    return { message: "Success", error: false };
  }
};

// const schema = z.object({
//   // tags: z.custom<TagName>((tagName) => Boolean(tags[tagName as TagName]), {}),
//   tags: getZodEnumFromObjectKeys(tags),
//   specific: z.string().min(1).max(128).optional(),
// }).superRefine(({tags, specific}, ref) => {
//
// });
