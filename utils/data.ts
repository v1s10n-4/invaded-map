import { Invader, InvaderState } from "@/db";

export const getState = (state: InvaderState) =>
  ({
    A: "Active",
    DG: "Degraded",
    H: "Hidden",
    D: "Destroyed",
    DD: "Exterminated",
    U: "Unknown",
  })[state];

export const getInvader = async (invaderName: string) => {
  const route = `/api/invaders/${invaderName}`;
  const res = await fetch(route, {
    next: {
      tags: [route],
    },
  });
  const invader: Invader | undefined = await res.json();
  return invader;
};
