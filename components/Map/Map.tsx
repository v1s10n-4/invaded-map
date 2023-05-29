"use client";
import React, { useEffect, useState } from "react";
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
  getInvader,
  getLatLng,
  gmapLibraries,
  invadersLocationList,
  markerIcon,
} from "./utils";
import { useParams, useRouter } from "next/navigation";
import useIVDMapStore from "@/app/store";
import SplashScreen from "@/public/assets/images/spashscreen.gif";
import Image from "next/image";
import { useGeolocated } from "react-geolocated";
import GPSIcon from "pixelarticons/svg/gps.svg";
import { clsx } from "clsx";
import { Colors } from "@/utils";

export const MapView = () => {
  const [hasZoomed, setHasZoomed] = useState<boolean>(false);
  const router = useRouter();
  const { invaderName } = useParams();
  const { isGeolocationEnabled, coords, getPosition } = useGeolocated({
    watchPosition: true,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { setInvadersInView } = useIVDMapStore((state) => ({
    setInvadersInView: state.setInvadersInView,
    openSheet: state.openMapSheet,
  }));
  useEffect(() => {
    if (map) {
      const currentZoom = map.getZoom();
      if (invaderName) {
        const invader = getInvader(invaderName);
        if (invader) map?.panTo(getLatLng(invader));
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
  console.log(coords?.heading);
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
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
    >
      <GoogleMap
        {...defaultGoogleMapProps}
        onLoad={setMap}
        onIdle={() => setInvadersInView(filterInvadersInView(map))}
      >
        <h1>{coords?.heading}</h1>
        <button
          className={clsx(
            "absolute bottom-14 right-2 z-10 h-12 w-12 border-2 border-primary bg-black p-1 text-primary",
            isGeolocationEnabled
              ? ""
              : "after:absolute after:inset-0 after:m-4 after:bg-black"
          )}
          style={{
            rotate: `${coords?.heading}deg`,
          }}
          onClick={getPosition}
        >
          <GPSIcon className="h-full w-full" />
        </button>
        {coords && (
          <Marker
            icon={{
              anchor: {
                x: 18,
                y: 18,
                toString: () => "(18, 18)",
                equals: (point: google.maps.Point) =>
                  point.toString() === "(18, 18)",
              },
              fillColor: Colors.primary, //"#000",
              fillOpacity: 1,
              path: "M12 20v-4H8v8H4v-4H0v12h4v-4h8v-8zM32 20v4h-4v-8h-4v12h8v4h4V20h-4zM12 12h4v4h-4zM20 12h4v4h-4zM20 4h-4v8h4V4zM20 16h-4v12h-4v4h12v-4h-4V16z",
              scale: 1,
              rotation: coords.heading || 0,
              strokeColor: Colors.primary,
              strokeWeight: 0.1,
            }}
            // icon={userPositionIcon}
            position={{ lat: coords?.latitude, lng: coords?.longitude }}
            title="your position"
          />
        )}
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
  );
};
export default MapView;
