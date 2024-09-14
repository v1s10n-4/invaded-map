import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

const privateApiRoutesRegex = new RegExp(
  "/(api(?!/invaders/[^/]+/OG|/revalidate).*)"
);
export function middleware(request: NextRequest, response: NextResponse) {
  const route = request.nextUrl.pathname;
  if (process.env.LOCAL !== "true" && privateApiRoutesRegex.test(route)) {
    const token = request.headers.get("api-token");
    if (!token || token !== process.env.API_SECRET)
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
  }
  if (new RegExp("^/map.*").test(route)) {
    const res = NextResponse.next();
    const { latitude, longitude } = geolocation(request);
    if (latitude && longitude)
      res.cookies.set(
        "geoip",
        JSON.stringify({
          lat: latitude,
          lng: longitude,
        })
      );
    else res.cookies.delete("geoip");
    return res;
  }
}
