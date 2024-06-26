import { invaders } from "@/db/schema/invaders";
import { users } from "@/db/schema/users";
import { createClient, sql } from "@vercel/postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle as VercelDrizzle } from "drizzle-orm/vercel-postgres";

// INVADER
type InvaderTable = typeof invaders;
export type NewInvader = InferInsertModel<InvaderTable>;
export type Invader = InferSelectModel<InvaderTable>;
export type InvaderState = Invader["state"];
export type InvaderWithLocation = {
  i: Invader["id"];
  n: Invader["name"];
  t: Invader["thumbnail"];
  l: NonNullable<Invader["location"]>;
};
// USER
type UserTable = typeof users;
export type User = InferSelectModel<UserTable>;

let client;
if (process.env.LOCAL === "true") {
  client = createClient();
  client.neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  client.neonConfig.useSecureWebSocket = false;
  client.neonConfig.pipelineTLS = false;
  client.neonConfig.pipelineConnect = false;
  client.connect();
} else {
  client = sql;
}
const db = VercelDrizzle(client);

export { db };
