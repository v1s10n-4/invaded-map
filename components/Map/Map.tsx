"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import {
  clustererOptions,
  defaultGoogleMapProps,
  filterInvadersInView,
  gmapLibraries,
  invadersLocationList,
  markerIcon,
} from "./utils";
import { useRouter } from "next/navigation";
import useIVDMapStore from "@/app/store";

export const MapView = () => {
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const setInvadersInView = useIVDMapStore((state) => state.setInvadersInView);
  return (
    <>
      <LoadScriptNext
        libraries={gmapLibraries}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
      >
        <GoogleMap
          {...defaultGoogleMapProps}
          onLoad={setMap}
          onIdle={() => setInvadersInView(filterInvadersInView(map))}
        >
          <MarkerClusterer options={clustererOptions}>
            {(clusterer) => (
              <>
                {invadersLocationList.map(({ lat, lng, name }) => (
                  <Marker
                    icon={markerIcon}
                    key={`${lat}${lng}${name}`}
                    position={{ lat, lng }}
                    clusterer={clusterer}
                    onClick={() => router.push(`/map/${name}`)}
                    title={name}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
};
export default MapView;
