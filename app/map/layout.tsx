import { db, InvaderWithLocation } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { isNotNull } from "drizzle-orm";
import React, { FC, PropsWithChildren } from "react";
import Map from "@/components/Map";
import MapSheet from "@/components/MapSheet";

export const runtime = "edge";
const MapLayout: FC<PropsWithChildren> = async ({ children }) => {
  const invadersWithLocation = (await db
    .select()
    .from(invaders)
    .where(isNotNull(invaders.location))) as InvaderWithLocation[];

  return (
    <>
      <Map invaders={invadersWithLocation} />
      <MapSheet>{children}</MapSheet>
    </>
  );
};

export default MapLayout;
