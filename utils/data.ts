import { Invader, InvaderState, InvaderWithLocation } from "@/db";
import { getRequestConfig } from "@/utils/revalidation-tags";

export const getState = (state: InvaderState) =>
  ({
    A: "Active",
    DG: "Degraded",
    H: "Hidden",
    D: "Destroyed",
    DD: "Exterminated",
    U: "Unknown",
  })[state];

export const REFERRAL_CODE_COOKIE_NAME = "referral-code";

const headers: HeadersInit = {
  "api-token": process.env.API_SECRET!,
};

const base = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.URL!;
const apiUrl = `${base}/api/`;
export const getInvader = async (invaderName: string) => {
  const route = `${apiUrl}invaders/${invaderName}`;
  const next = getRequestConfig("invader", invaderName);
  const res = await fetch(route, { headers, next });
  const { data: invader } = (await res.json()) as { data: Invader | undefined };
  return invader;
};

export const getInvadersWithLocation = async () => {
  const route = `${apiUrl}map/invaders`;
  const next = getRequestConfig("all map invaders");
  const response = await fetch(route, { headers, next });
  if (response.status !== 200) {
    const text = await response.text();
    console.warn(response.status, response.statusText);
    return [{ n: "Error", i: 0, l: { lat: 0, lng: 0 }, t: text }];
  }
  const invaders: InvaderWithLocation[] = await response.json();
  return invaders;
};

export const getInvaders = async () => {
  const route = `${apiUrl}invaders`;
  const next = getRequestConfig("all invaders");
  const response = await fetch(route, { headers, next });
  const invaders: Invader[] = await response.json();
  return invaders;
};

export const get_PNG_b64_data_URI_from_AVIF_URL = async (url: string) => {
  const route = `${apiUrl}get-thumbnail?url=${url}`;
  const next = getRequestConfig("invader OG", url);
  const thumbnailRes = await fetch(route, { headers, next });
  const b64Image = await thumbnailRes.json();
  return `data:image/png;base64,${b64Image}`;
};
