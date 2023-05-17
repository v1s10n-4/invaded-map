import React, { FC, PropsWithChildren } from "react";
import Map from "@/components/Map";
import MapSheet from "@/components/MapSheet/MapSheet";

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Map />
      <MapSheet>{children}</MapSheet>
    </>
  );
};

export default MapLayout;
