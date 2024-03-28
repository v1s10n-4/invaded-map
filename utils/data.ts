import { Invader, InvaderState, InvaderWithLocation } from "@/db";

export const getState = (state: InvaderState) =>
  ({
    A: "Active",
    DG: "Degraded",
    H: "Hidden",
    D: "Destroyed",
    DD: "Exterminated",
    U: "Unknown",
  })[state];

const headers: HeadersInit = {
  "api-token": process.env.API_SECRET!,
};

const base = `https://${process.env.VERCEL_URL}/api/`;
export const getInvader = async (invaderName: string) => {
  const route = `invaders/${invaderName}`;
  const res = await fetch(base + route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const { data: invader } = (await res.json()) as { data: Invader | undefined };
  return invader;
};

export const getInvadersWithLocation = async () => {
  const route = `map/invaders`;
  const response = await fetch(base + route, {
    headers,
    next: {
      tags: [route],
    },
  });
  if (response.status !== 200) {
    const esse = await response.text();
    console.warn(response.status, response.statusText);
    return [{ n: "Error", i: 0, l: { lat: 0, lng: 0 }, t: esse }];
  }
  const invaders: InvaderWithLocation[] = await response.json();
  return invaders;
};

export const getInvaders = async () => {
  const route = `invaders`;
  const response = await fetch(base + route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invaders: Invader[] = await response.json();
  return invaders;
};

export const get_PNG_b64_data_URI_from_AVIF_URL = async (url: string) => {
  const route = `get-thumbnail?url=${url}`;
  const thumbnailRes = await fetch(base + route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const b64Image = await thumbnailRes.json();
  return `data:image/png;base64,${b64Image}`;
};
