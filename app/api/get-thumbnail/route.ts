import { NextRequest } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-static";
export async function GET(request: NextRequest): Promise<Response> {
  const param = request.nextUrl.searchParams.get("url");
  if (!param) return Response.json({ error: true, data: null });
  try {
    const url = new URL(param);
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const thumbnailBuffer = await sharp(buffer).toFormat("png").toBuffer();
    const image = thumbnailBuffer.toString("base64");
    return Response.json(image);
  } catch (err) {
    console.error(err);
    return Response.json({ error: true, data: null });
  }
}
