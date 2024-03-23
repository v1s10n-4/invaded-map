import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { isNotNull } from "drizzle-orm";

export const runtime = "edge";

export async function GET(): Promise<Response> {
  const list = await db
    .select()
    .from(invaders)
    .where(isNotNull(invaders.location));
  return Response.json(list);
}
