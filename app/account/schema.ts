import { users } from "@/db/schema/users";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
export const MAX_IMAGE_SIZE = 4; //In MegaBytes

export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

// TODO use these once server action stop to fuck File formDatas up
// export const imagesSchema = z.object({
//   profileImage: z
//     .custom<FileList>()
//     .refine((files) => {
//       return Array.from(files ?? []).length !== 0;
//     }, "Image is required")
//     .refine((files) => {
//       return Array.from(files ?? []).every(
//         (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
//       );
//     }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
//     .refine((files) => {
//       return Array.from(files ?? []).every((file) =>
//         ACCEPTED_IMAGE_TYPES.includes(file.type)
//       );
//     }, "File type is not supported"),
// });

export const imageSchema = z
  .custom<File>()
  .refine((file) => {
    return file;
  }, "Image is required")
  .refine(
    (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
    `The maximum image size is ${MAX_IMAGE_SIZE}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "File type is not supported"
  );

export const updateUserSchema = createInsertSchema(users, {
  name: ({ name }) => name.min(3).max(32),
  image: () => imageSchema,
}).pick({
  name: true,
  image: true,
});

export const updateUsernameSchema = updateUserSchema
  .pick({ name: true })
  .required();

export const updateUserImageSchema = imageSchema;
