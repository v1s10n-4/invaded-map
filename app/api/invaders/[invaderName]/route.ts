import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-static";

type RouteParams = { params: Promise<{ invaderName: string }> };

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
  const { invaderName } = await params;
  const [invader] = await db
    .select()
    .from(invaders)
    .where(eq(invaders.name, invaderName));
  return Response.json({ data: invader });
}
