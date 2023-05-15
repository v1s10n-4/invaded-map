import React, { FC, PropsWithChildren } from "react";
import Map from "@/components/Map";
import Sheet from "react-modal-sheet";
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
