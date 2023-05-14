import React, { FC, PropsWithChildren } from "react";
import Map from "@/components/Map";

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Map />
      {children}
    </>
  );
};

export default MapLayout;
