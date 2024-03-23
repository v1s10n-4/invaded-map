import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/(api(?!/invaders/[^/]+/OG).*)",
};

export function middleware(request: NextRequest) {
  const token = request.headers.get("api-token");
  if (!token || token !== process.env.API_SECRET)
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
}
