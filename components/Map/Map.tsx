"use client";
import React, { useEffect, useState } from "react";
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
  getInvader,
  getLatLng,
  gmapLibraries,
  invadersLocationList,
  markerIcon,
} from "./utils";
import { useParams, useRouter } from "next/navigation";
import useIVDMapStore from "@/app/store";

export const MapView = () => {
  const router = useRouter();
  const { invaderName } = useParams();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { setInvadersInView, openSheet } = useIVDMapStore((state) => ({
    setInvadersInView: state.setInvadersInView,
    openSheet: state.openMapSheet,
  }));
  useEffect(() => {
    if (map && invaderName) {
      const invader = getInvader(invaderName);
      if (invader) map?.panTo(getLatLng(invader));
    }
  }, [map, invaderName]);
  return (
    <>
      <LoadScriptNext
        libraries={gmapLibraries}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
      >
        <GoogleMap
          {...defaultGoogleMapProps}
          onLoad={setMap}
          onIdle={() => {
            setInvadersInView(filterInvadersInView(map));
            openSheet();
          }}
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
