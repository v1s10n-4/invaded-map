import { users } from "@/db/schema/users";
import { createInsertSchema } from "drizzle-zod";

export const updateUserSchema = createInsertSchema(users, {
  name: ({ name }) => name.min(3).max(32),
  image: ({ image }) => image.url().optional(),
}).pick({
  name: true,
  image: true,
});

export const updateUsernameSchema = updateUserSchema
  .pick({ name: true })
  .required();
