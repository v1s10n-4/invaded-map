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
export const getInvader = async (invaderName: string) => {
  const route = `${process.env.URL}/api/invaders/${invaderName}`;
  const res = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invader: Invader | undefined = await res.json();
  console.log({ invader });
  return invader;
};

export const getInvadersWithLocation = async () => {
  const route = `${process.env.URL}/api/map/invaders`;
  const response = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invaders: InvaderWithLocation[] = await response.json();
  return invaders;
};

export const getInvaders = async () => {
  const route = `${process.env.URL}/api/invaders`;
  const response = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invaders: Invader[] = await response.json();
  return invaders;
};

export const get_PNG_b64_data_URI_from_AVIF_URL = async (url: string) => {
  const route = `${process.env.URL}/api/get-thumbnail?url=${url}`;
  const thumbnailRes = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const b64Image = await thumbnailRes.json();
  return `data:image/png;base64,${b64Image}`;
};
