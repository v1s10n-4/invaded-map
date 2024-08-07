import { Invader } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { rewardTypes } from "@/db/schema/rewards";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import {
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export type InvaderEditableField = keyof Pick<
  Invader,
  "state" | "points" | "create_date"
>;
export const reviewTaskTypes = pgEnum("review_task_type", [
  "edit",
  "create",
  "report",
  "post",
]);

export const reviewTasks = pgTable("review_task", {
  id: serial("id").primaryKey(),
  entity_id: integer("entity_id")
    .notNull()
    .references(() => invaders.id),
  editor_id: text("editor_id")
    .notNull()
    .references(() => users.id),
  reward_id: integer("reward_id")
    .notNull()
    .references(() => rewardTypes.id),
  type: reviewTaskTypes("type").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  change: json("change")
    .$type<{
      field: InvaderEditableField;
      value: any;
    }>()
    .notNull(),
  proof_image: varchar("proof_image", { length: 192 }).notNull(),
});

export const reviewTasksRelations = relations(reviewTasks, ({ one }) => ({
  reward: one(rewardTypes, {
    fields: [reviewTasks.reward_id],
    references: [rewardTypes.id],
  }),
  entity: one(invaders, {
    fields: [reviewTasks.entity_id],
    references: [invaders.id],
  }),
  editor: one(users, {
    fields: [reviewTasks.editor_id],
    references: [users.id],
  }),
}));
