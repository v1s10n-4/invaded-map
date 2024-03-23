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
  "api-token": process.env.API_TOKEN!,
};
export const getInvader = async (invaderName: string) => {
  const route = `/api/invaders/${invaderName}`;
  const res = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invader: Invader | undefined = await res.json();
  return invader;
};

export const getInvadersWithLocation = async () => {
  const route = "/api/map/invaders";
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
  const route = "/api/invaders";
  const response = await fetch(route, {
    headers,
    next: {
      tags: [route],
    },
  });
  const invaders: Invader[] = await response.json();
  return invaders;
};
