import { InvaderImage } from "@/app/api/invaders/[invaderName]/OG/InvaderImage";
import { get_PNG_b64_data_URI_from_AVIF_URL, getInvader } from "@/utils/data";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

type RouteParams = { params: { invaderName: string } };

export async function GET(
  request: NextRequest,
  params: RouteParams
): Promise<Response> {
  const fontResponse = await fetch(
    `${request.nextUrl.origin}/assets/fonts/Sixtyfour-Normal.ttf`
  );
  const fontData = await fontResponse.arrayBuffer();
  const invaderName = params.params.invaderName;
  const invader = await getInvader(invaderName);
  let b64ThumbnailDataURI = invader?.thumbnail;

  if (invader && invader.thumbnail.endsWith(".avif")) {
    b64ThumbnailDataURI = await get_PNG_b64_data_URI_from_AVIF_URL(
      invader.thumbnail
    );
  }

  return new ImageResponse(
    (
      <InvaderImage
        name={invader?.name}
        location={invader?.location}
        thumbnail={b64ThumbnailDataURI}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "sixtyfour",
          data: fontData,
          style: "normal",
        },
      ],
    }
  ) as Response;
}
