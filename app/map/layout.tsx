import Map from "@/components/Map";
import MapSheet from "@/components/MapSheet";
import { InvaderWithLocation } from "@/db";
import React, { FC, PropsWithChildren } from "react";

export const runtime = "edge";
const MapLayout: FC<PropsWithChildren> = async ({ children }) => {
  const route = "/api/map/invaders";
  const response = await fetch(route, {
    next: {
      tags: [route],
    },
  });
  const invaders: InvaderWithLocation[] = await response.json();
  return (
    <>
      <Map invaders={invaders} />
      <MapSheet>{children}</MapSheet>
    </>
  );
};

export default MapLayout;
