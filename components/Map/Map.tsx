"use client";
import { InvaderWithLocation } from "@/db";
import React, { FC, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerClustererF as MarkerClusterer,
  MarkerF as Marker,
} from "@react-google-maps/api";
import {
  clustererOptions,
  defaultGoogleMapProps,
  filterInvadersInView,
  gmapLibraries,
  markerIcon,
  markerSelectedIcon,
} from "./utils";
import { useParams, useRouter } from "next/navigation";
import useIVDMapStore from "@/app/store";
import SplashScreen from "@/public/assets/images/splashscreen.gif";
import Image from "next/image";
import UserMarker from "@/components/Map/UserMarker";

const removeGoogleCrap = () =>
  Array.from(
    document.querySelectorAll(
      `img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_gray.svg"]`
    )
  )?.forEach((el) => el.parentElement?.parentElement?.remove());

export const MapView: FC<{ invaders: InvaderWithLocation[] }> = ({
  invaders,
}) => {
  const [hasZoomed, setHasZoomed] = useState<boolean>(false);
  const router = useRouter();
  const { invaderName } = useParams();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { setInvadersInView, setLockUserPosition, setLockUserRotation } =
    useIVDMapStore((state) => ({
      setInvadersInView: state.setInvadersInView,
      // openSheet: state.openMapSheet,
      setLockUserPosition: state.setLockUserPosition,
      setLockUserRotation: state.setLockUserRotation,
    }));
  useEffect(() => {
    if (map) {
      const currentZoom = map.getZoom();
      if (invaderName) {
        const name =
          typeof invaderName === "string" ? invaderName : invaderName.at(0)!;
        const invader = invaders.find(
          (invader) => invader.name === invaderName
        );
        if (invader) map?.panTo(invader.location);
        if (!hasZoomed) {
          if (currentZoom) map?.setZoom(currentZoom + 2);
          setHasZoomed(true);
        }
      } else if (hasZoomed) {
        if (currentZoom) map.setZoom(currentZoom - 2);
        setHasZoomed(false);
      }
    }
  }, [map, invaderName, hasZoomed]);
  return (
    <LoadScriptNext
      loadingElement={
        <Image
          priority
          src={SplashScreen}
          alt={"Invaded map loading"}
          className="relative h-full w-full object-contain"
        />
      }
      libraries={gmapLibraries}
      googleMapsApiKey={
        process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY! + `&loading=async`
      }
    >
      <GoogleMap
        {...defaultGoogleMapProps}
        onLoad={setMap}
        onTilesLoaded={removeGoogleCrap}
        onDragStart={() => {
          setLockUserPosition(false);
          setLockUserRotation(false);
        }}
        onIdle={() => setInvadersInView(filterInvadersInView(invaders, map))}
      >
        {map && <UserMarker map={map} />}
        <MarkerClusterer options={clustererOptions}>
          {(clusterer) => (
            <>
              {invaders.map(({ id, location, name }) => (
                <Marker
                  icon={invaderName === name ? markerSelectedIcon : markerIcon}
                  key={id}
                  position={location}
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
  );
};
export default MapView;
