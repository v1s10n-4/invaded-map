import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const list = await db.select().from(invaders);
  return Response.json(list);
}
