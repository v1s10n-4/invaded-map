import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const REFERRAL_CODE_COOKIE_NAME = "referral-code";
export const GET = async (
  _req: NextApiRequest,
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
