import { Invader } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const contributionTypes = pgEnum("contribution_type", [
  "edit",
  "create",
  "delete",
]);

export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  entity_id: integer("entity_id")
    .notNull()
    .references(() => invaders.id),
  editor_id: text("editor_id")
    .notNull()
    .references(() => users.id),
  reviewer_id: text("reviewer_id")
    .notNull()
    .references(() => users.id),
  comment: varchar("comment", { length: 72 }),
  type: contributionTypes("type").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  data: jsonb("data").$type<Partial<Invader>>(),
});

export const contributionsRelations = relations(contributions, ({ one }) => ({
  entity: one(invaders, {
    fields: [contributions.entity_id],
    references: [invaders.id],
  }),
  editor: one(users, {
    fields: [contributions.editor_id],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [contributions.reviewer_id],
    references: [users.id],
  }),
}));
