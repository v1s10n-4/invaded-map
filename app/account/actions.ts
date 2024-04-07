"use server";
import { updateUsernameSchema } from "@/app/account/schema";
import { auth, signIn, updateUser } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export const updateUsername = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  const data = Object.fromEntries(formData);
  const safeData = updateUsernameSchema.safeParse(data);
  if (!safeData.success) {
    return { success: false, errors: safeData.error.flatten().fieldErrors };
  }
  // TODO use updateUser from next-auth once its stable
  // await updateUser({
  //   ...session,
  //   user: { ...session.user, ...safeData.data },
  // });
  const res = await db
    .update(users)
    .set(safeData.data)
    .where(eq(users.id, session.user.id))
    .returning()
    .then((res) => res[0]);
  await updateUser({});
  console.log(res);
  return safeData;
  // updateUser(data);
};
