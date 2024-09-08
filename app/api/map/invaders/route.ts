import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { isNotNull } from "drizzle-orm";

export const runtime = "edge";

export async function GET(): Promise<Response> {
  const list = await db
    .select({
      i: invaders.id,
      n: invaders.name,
      l: invaders.location,
      t: invaders.thumbnail,
    })
    .from(invaders)
    .where(isNotNull(invaders.location));
  return Response.json(list);
}
