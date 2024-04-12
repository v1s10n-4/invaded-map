import { rewardTypes } from "@/db/schema/rewards";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { generateUsername } from "edge-unique-username-generator";

export const referralTypeEnum = pgEnum("referral_type", [
  "basic",
  "qr-code",
  "email",
]);

export const referralLinks = pgTable("referral_links", {
  id: serial("id").primaryKey(),
  referrer_id: text("referrer_id")
    .references(() => users.id, {
      onDelete: "set null",
    })
    .notNull(),
  code: text("code")
    .notNull()
    .unique()
    .$default(() => generateUsername("-", 4, 32)),
  type: referralTypeEnum("type").default("basic").notNull(),
  used: smallint("used").default(0).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  reward_type_id: integer("reward_type_id").references(() => rewardTypes.id),
});

export const referralLinksRelations = relations(
  referralLinks,
  ({ one, many }) => ({
    referrer: one(users, {
      relationName: "referral_links",
      fields: [referralLinks.referrer_id],
      references: [users.id],
    }),
    reward: one(rewardTypes, {
      fields: [referralLinks.reward_type_id],
      references: [rewardTypes.id],
    }),
    referees: many(users, { relationName: "referrer_link" }),
  })
);

// export const referees = pgTable("referees", {
//   id: serial("id").primaryKey(),
//   referee_id: text("referee_id")
//     .default("deleted")
//     .references(() => users.id, { onDelete: "set default" })
//     .notNull(),
//   referral_link_id: integer("").notNull(),
// });
//
// export const refereesRelations = relations(referees, ({ one }) => ({
//   referees: one(referral_links, {
//     fields: [referees.referral_link_id],
//     references: [referral_links.id],
//   }),
// }));
