import { referralLinks } from "@/db/schema/referral_links";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const rewardableActionTypes = pgEnum("rewardableActionType", [
  "POPULARITY",
  "CONTRIBUTION",
  "ACHIEVEMENT",
  "TOXICITY",
]);

export const rewardTypes = pgTable("reward_type", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique(),
  description: text("description"),
  points: smallint("points").notNull().default(1),
  type: rewardableActionTypes("type").notNull(),
});

export const rewardTypesRelations = relations(rewardTypes, ({ many }) => ({
  users: many(usersToRewards),
  referral_link: many(referralLinks),
}));

export const usersToRewards = pgTable(
  "users_to_rewards",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.id),
    reward_id: integer("reward_id")
      .notNull()
      .references(() => rewardTypes.id),
  },
  (table) => ({
    pk: primaryKey({
      name: "users_to_rewards_pk",
      columns: [table.reward_id, table.user_id],
    }),
  })
);

export const usersToRewardsRelations = relations(usersToRewards, ({ one }) => ({
  user: one(users, {
    fields: [usersToRewards.user_id],
    references: [users.id],
  }),
  reward: one(rewardTypes, {
    fields: [usersToRewards.reward_id],
    references: [rewardTypes.id],
  }),
}));
