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
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";

export const updateUsername = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  const data = Object.fromEntries(formData);
  const safeData = updateUsernameSchema.safeParse(data);
  if (!safeData.success) {
    return { success: false, errors: safeData.error.flatten().fieldErrors };
  }
  // TODO use just updateUser from next-auth once its stable
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
  return safeData;
};

export const weirdestFunctionIEverHadToCode = async (fuckingNonSense: any) => {
  const symbols = Object.getOwnPropertySymbols(fuckingNonSense);
  const symdict: any = symbols.reduce(
    (acc, x) => ({ ...acc, [x.description as string]: x }),
    {}
  );
  const blob = fuckingNonSense[symdict.kHandle];
  const type = fuckingNonSense[symdict.kType];
  const size = fuckingNonSense[symdict.kLength];
  console.log({ blob, type, size });
  // I don't know why but images from formData passed to server action have keys as symbol
  if (
    // blob instanceof Blob &&
    blob &&
    typeof size === "number" &&
    typeof type === "string"
  ) {
    console.log("image was a fucking instance of File!!!");
    return { blob, type, size };
  }
  return false;
};

export const updateAvatar = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return signIn();
  const image = formData.get("image");
  if (image && !(image instanceof File)) {
    const result = await weirdestFunctionIEverHadToCode(image);
    if (result) {
      const { type, size } = result;
      if (sizeInMB(size) < MAX_IMAGE_SIZE) {
        if (ACCEPTED_IMAGE_TYPES.includes(type)) {
          const putRes = await put(
            `${session.user.id}.${type.split("/")[1]}`,
            image,
            {
              access: "public",
            }
          );
          const res = await db
            .update(users)
            .set({ image: putRes.url })
            .where(eq(users.id, session.user.id))
            .returning()
            .then((res) => res[0]);
          await updateUser({});
          return { success: true };
        }
        return {
          success: false,
          errors: {
            image: [
              `${type} is not allowed (${ACCEPTED_IMAGE_TYPES.map((x) => x.split("/")[1]).join(", ")})`,
            ],
          },
        };
      }
      return {
        success: false,
        errors: {
          image: [
            `file is too big (${sizeInMB(size)}mb) max is ${MAX_IMAGE_SIZE}mb`,
          ],
        },
      };
    } else return { success: false, errors: { image: ["it's not an image"] } };
  }
  console.log({ image });
  return { success: false, errors: { image: ["Required"] } };
};

// TODO use the better version once things get better with server action + files
// export const updateAvatar = async (prevState: any, formData: FormData) => {
//   const session = await auth();
//   if (!session) return signIn();
//   const image = formData.get("image");
// const safeData = updateUserImageSchema.safeParse({ image });
// if (!safeData.success) {
//   return { success: false, errors: safeData.error.flatten().fieldErrors };
// }
// const res = await db
//   .update(users)
//   .set(safeData.data)
//   .where(eq(users.id, session.user.id))
//   .returning()
//   .then((res) => res[0]);
// await updateUser({});
// console.log(safeData);
// return safeData;
// updateUser(data);
