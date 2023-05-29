"use client";
import { clsx } from "clsx";
import GPSIcon from "pixelarticons/svg/gps.svg";
import { MarkerF as Marker } from "@react-google-maps/api";
import { Colors } from "@/utils";
import React from "react";
import { useGeolocated } from "react-geolocated";
import useDeviceOrientation from "@/components/Map/utils/useDeviceOrientation";

export const UserMarker = () => {
  const { isGeolocationEnabled, coords, getPosition } = useGeolocated({
    watchPosition: true,
  });
  const orientation = useDeviceOrientation();

  return (
    <>
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
            rotation: orientation?.webkitCompassHeading || coords.heading || 0,
            strokeColor: Colors.primary,
            strokeWeight: 0.1,
          }}
          position={{ lat: coords?.latitude, lng: coords?.longitude }}
          title="your position"
        />
      )}
    </>
  );
};

export default UserMarker;
