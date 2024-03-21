/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { mapStyles } from "@/components/Map";
import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import {
  baseGoogleStaticMapUrl,
  Colors,
  getStaticMapStyle,
  gmapUrlParams,
} from "@/utils";
import { eq } from "drizzle-orm";
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
  const searchParams = new URLSearchParams(gmapUrlParams);
  const invaderName = params.params.invaderName;
  const [invader] = await db
    .select()
    .from(invaders)
    .where(eq(invaders.name, invaderName));

  if (invader.location) {
    searchParams.set(
      "center",
      `${invader.location.lat},${invader.location.lng}`
    );
    searchParams.set("zoom", "16");
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: Colors.primary,
          fontFamily: "'sixtyfour'",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={`${baseGoogleStaticMapUrl}?${searchParams.toString()}&${getStaticMapStyle(
            mapStyles.sixtyfour
          )}`}
          width={1200}
          height={1200}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            backgroundColor: "black",
            alignItems: "center",
            boxShadow: `0px 0px 16px 2px ${Colors.secondary}, 0 0 0 6px black, 0 0 0 10px ${Colors.primary}`,
            gap: 5,
          }}
        >
          {invader && (
            <img
              src={`${request.nextUrl.origin}/assets/images/invaders/${invaderName}.png`}
              width={256}
              height={256}
              style={{
                overflowX: "hidden",
                borderColor: Colors.primary,
                borderWidth: 4,
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              borderColor: Colors.primary,
              borderWidth: 4,
              padding: invader ? 0 : "4px 20px 4px 8px",
            }}
          >
            {!invader && (
              <p
                style={{
                  fontSize: 128,
                  textShadow: `${Colors.accent} 0px 0px 0.08em`,
                }}
              >
                404
              </p>
            )}
            {!invader && (
              <p
                style={{
                  fontSize: 56,
                  textShadow: `${Colors.accent} 0px 0px 0.2em`,
                }}
              >
                INVADER
              </p>
            )}
            <p
              style={{
                fontSize: invader ? 32 : 40,
                textShadow: `${Colors.accent} 0px 0px 0.2em`,
              }}
            >
              {invader ? invaderName : "NOT FOUND"}
            </p>
          </div>
        </div>
      </div>
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
  // return NextResponse.json(request.nextUrl.origin);
}
