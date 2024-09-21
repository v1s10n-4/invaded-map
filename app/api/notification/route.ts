import { NextRequest } from "next/server";
import { contributionReviewed } from "@/novu/workflows";

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<Response> {
  const json = await request.json();
  const res = await contributionReviewed.trigger(json);
  return Response.json({ error: !!res.data.error, data: res.data });
}
