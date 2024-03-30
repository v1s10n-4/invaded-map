import { NextRequest, NextResponse } from "next/server";

const privateApiRoutesRegex = new RegExp(
  "/(api(?!/invaders/[^/]+/OG|/revalidate).*)"
);
export function middleware(request: NextRequest, response: NextResponse) {
  const route = request.nextUrl.pathname;
  if (privateApiRoutesRegex.test(route)) {
    console.log("api shield triggered");
    const token = request.headers.get("api-token");
    if (!token || token !== process.env.API_SECRET)
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
  }
  if (new RegExp("/map.*").test(route)) {
    const res = NextResponse.next();
    res.cookies.set("fesse", JSON.stringify(request.geo));
    return res;
  }
}
