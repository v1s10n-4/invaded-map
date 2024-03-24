import { invaders } from "@/db/schema/invaders";
import { neonConfig } from "@neondatabase/serverless";
import { sql, createPool, createClient } from "@vercel/postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  drizzle as LocalDrizzle,
  type NodePgDatabase,
} from "drizzle-orm/node-postgres";
import {
  drizzle as VercelDrizzle,
  type VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import { drizzle as NeonDrizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "pg";

type InvaderTable = typeof invaders;
export type NewInvader = InferInsertModel<InvaderTable>;
export type Invader = InferSelectModel<InvaderTable>;
export type InvaderState = Invader["state"];
export type InvaderWithLocation = Invader & {
  location: NonNullable<Invader["location"]>;
};
// let db:
//   | VercelPgDatabase<Record<string, never>>
//   | NodePgDatabase<Record<string, never>>;
// console.log({
//   LOCAL_env: process.env.LOCAL,
//   cond: process.env.LOCAL === "true",
// });
// if (process.env.LOCAL === "true") {
//   const client = new Pool({
//     connectionString: process.env.POSTGRES_URL!,
//   });
//   await client.connect();
//   db = LocalDrizzle(client);
// } else {

// const db = VercelDrizzle(sql);

// neonConfig.wsProxy = (host) => {
//   console.log(host);
//   return `${host}:5433/v1`;
// };
// // Disable all authentication and encryption
// neonConfig.useSecureWebSocket = false;
// neonConfig.pipelineTLS = false;
// neonConfig.pipelineConnect = false;
// const db = VercelDrizzle(sql);
const client = createClient();
client.neonConfig.wsProxy = (host) => `${host}:5433/v1`;
// Disable all authentication and encryption.
client.neonConfig.useSecureWebSocket = false;
client.neonConfig.pipelineTLS = false;
client.neonConfig.pipelineConnect = false;
const db = VercelDrizzle(client);
db.session.client.connect();
// }

export { db };
