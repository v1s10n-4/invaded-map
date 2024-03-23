import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

export function middleware(request: NextRequest) {
  const token = request.headers.get("api-token");
  if (!token || token !== process.env.API_TOKEN)
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
}