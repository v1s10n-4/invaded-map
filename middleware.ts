import { NextRequest, NextResponse } from "next/server";

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
    if (request.geo?.latitude && request.geo?.longitude)
      res.cookies.set(
        "geoip",
        JSON.stringify({
          lat: request.geo.latitude,
          lng: request.geo.longitude,
        })
      );
    else res.cookies.delete("geoip");
    return res;
  }
}
