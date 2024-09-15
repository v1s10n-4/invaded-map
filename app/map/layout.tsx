import Map from "@/app/map/index";
import MapSheet from "@/components/MapSheet";
import { getInvadersWithLocation } from "@/utils/data";
import React, { FC, PropsWithChildren } from "react";

export const runtime = "edge";
const MapLayout: FC<PropsWithChildren> = async ({ children }) => {
  const invaders = await getInvadersWithLocation();
  return (
    <>
      <Map invaders={invaders} />
      <MapSheet>{children}</MapSheet>
    </>
  );
};

export default MapLayout;
