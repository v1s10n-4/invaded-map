import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const runtime = "edge";

type RouteParams = { params: { invaderName: string } };

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
  const invaderName = params.invaderName;
  const [invader] = await db
    .select()
    .from(invaders)
    .where(eq(invaders.name, invaderName));
  return Response.json(invader);
}
