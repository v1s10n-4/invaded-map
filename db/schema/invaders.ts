import {
  date,
  pgTable,
  pgEnum,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
  customType,
  jsonb,
} from "drizzle-orm/pg-core";
import { Image, location } from "@/db/utils";

export const invaderStateEnum = pgEnum("invader_state", [
  "A",
  "DG",
  "H",
  "D",
  "DD",
  "U",
]);
export const invaders = pgTable("invaders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 16 }).notNull(),
  city: varchar("city", { length: 32 }).notNull(),
  city_name: varchar("city_name", { length: 64 }).notNull(),
  state: invaderStateEnum("state").notNull(),
  thumbnail: text("thumbnail").notNull(),
  points: smallint("points").notNull(),
  create_date: timestamp("create_date").notNull(),
  update_date: timestamp("update_date"),
  location: location("location"),
  info: text("info"),
  comment: text("comment"),
  images: jsonb("images").$type<Image[]>(),
});
