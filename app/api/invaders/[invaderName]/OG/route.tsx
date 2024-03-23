/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { InvaderImage } from "@/app/api/invaders/[invaderName]/OG/InvaderImage";
import { Invader } from "@/db";
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

  const invaderRes = await fetch(
    `${request.nextUrl.origin}/api/invaders/${invaderName}`,
    {
      next: {
        tags: [`invaders/${invaderName}`],
      },
    }
  );
  const invader: Invader | undefined = await invaderRes.json();
  let b64ThumbnailDataURI;

  if (invader) {
    const thumbnailRes = await fetch(
      `${request.nextUrl.origin}/api/get-thumbnail?url=${invader.thumbnail}`,
      {
        next: {
          tags: [`invaders/${invader.name}/og`],
        },
      }
    );
    const b64Image = await thumbnailRes.json();
    b64ThumbnailDataURI = `data:image/png;base64,${b64Image}`;
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
