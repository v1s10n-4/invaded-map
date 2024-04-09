import { referralLinks } from "@/db/schema/referral_links";
import { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { generateUsername } from "edge-unique-username-generator";

export const RoleEnum = pgEnum("role", [
  "user",
  "poweruser",
  "moderator",
  "admin",
  "superuser",
]);
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name")
    .$default(() => generateUsername("-", 0, 32))
    .notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: RoleEnum("role").notNull().default("user"),
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  referrer_link_id: integer("referrer_id"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const usersRelations = relations(users, ({ one, many }) => ({
  referrer_link: one(referralLinks, {
    relationName: "referrer_link",
    fields: [users.referrer_link_id],
    references: [referralLinks.id],
  }),
  referral_links: many(referralLinks, { relationName: "referral_links" }),
}));
