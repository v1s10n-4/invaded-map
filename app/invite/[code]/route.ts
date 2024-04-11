import { REFERRAL_CODE_COOKIE_NAME } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params: { code } }: { params: { code: string } }
) => {
  const response = NextResponse.redirect(`${process.env.URL}/map`);
  response.cookies.set({
    name: REFERRAL_CODE_COOKIE_NAME,
    value: code,
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: process.env.LOCAL !== "true",
    sameSite: "strict",
    httpOnly: true,
  });
  return response;
};
