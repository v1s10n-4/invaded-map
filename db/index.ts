import { invaders } from "@/db/schema/invaders";
import { sql } from "@vercel/postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

type InvaderTable = typeof invaders;
export type NewInvader = InferInsertModel<InvaderTable>;
export type Invader = InferSelectModel<InvaderTable>;
export type InvaderState = Invader["state"];
export type InvaderWithLocation = Invader & {
  location: NonNullable<Invader["location"]>;
};

export const db = drizzle(sql);
