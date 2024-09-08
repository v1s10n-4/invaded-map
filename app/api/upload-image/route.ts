import { updateUserImageSchema } from "@/app/account/schema";
import { put } from "@vercel/blob";
import { NextRequest } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export async function POST(request: NextRequest): Promise<Response> {
  const form = await request.formData();
  const image = form.get("image");
  const safeData = updateUserImageSchema.safeParse(image);
  if (
    !safeData.success ||
    !safeData.data.name ||
    safeData.data.name.length > 32
  )
    return Response.json({ error: true, data: null });
  try {
    const buffer = await safeData.data.arrayBuffer();
    const thumbnailBuffer = await sharp(buffer)
      .resize({ withoutEnlargement: true, width: 900 })
      .toFormat("avif", { quality: 80, effort: 6, chromaSubsampling: "4:4:4" })
      .toBuffer();

    const blobRes = await put(
      `reviews/${safeData.data.name}.avif`,
      thumbnailBuffer,
      {
        access: "public",
      }
    );

    return Response.json({ error: false, data: blobRes });
  } catch (err) {
    console.error("Error in app/api/upload-image/route.ts:19", err);
    return Response.json({ error: true, data: null });
  }
}
