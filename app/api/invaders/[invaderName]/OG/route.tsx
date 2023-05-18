/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { getInvader, mapStyles, Paris } from "@/components/Map";
import { ImageResponse, NextRequest } from "next/server";
import { Colors } from "@/utils";

export const runtime = "edge";

function get_static_style(styles: google.maps.MapTypeStyle[]) {
  const result: string[] = [];
  styles.forEach(function (v) {
    let style = "";
    if (v.stylers) {
      // only if there is a styler object
      if (v.stylers.length > 0) {
        // Needs to have a style rule to be valid.
        style +=
          (v.hasOwnProperty("featureType")
            ? "feature:" + v.featureType
            : "feature:all") + "|";
        style +=
          (v.hasOwnProperty("elementType")
            ? "element:" + v.elementType
            : "element:all") + "|";
        v.stylers.forEach((val) => {
          const propertyname = Object.keys(val)[0];
          // @ts-ignore
          const propertyval = val[propertyname].toString().replace("#", "0x");
          style += propertyname + ":" + propertyval + "|";
        });
      }
    }
    result.push("style=" + encodeURIComponent(style));
  });

  return result.join("&");
}

type RouteParams = { params: { invaderName: string } };

const baseGoogleStaticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";
const gmapUrlParams = {
  size: "1200x1200",
  scale: "2",
  zoom: "12",
  center: `${Paris.lat},${Paris.lng}`,
  key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
};

export async function GET(request: NextRequest, params: RouteParams) {
  const fontResponse = await fetch(
    `${request.nextUrl.origin}/assets/fonts/Sixtyfour-Normal.ttf`
  );
  const fontData = await fontResponse.arrayBuffer();
  const searchParams = new URLSearchParams(gmapUrlParams);
  const invaderName = params.params.invaderName;
  const invader = getInvader(invaderName);
  if (invader) {
    searchParams.set("center", `${invader.lat},${invader.lng}`);
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
          src={`${baseGoogleStaticMapUrl}?${searchParams.toString()}&${get_static_style(
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
  );
  // return NextResponse.json(request.nextUrl.origin);
}
