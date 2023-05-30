"use client";
import { clsx } from "clsx";
import MinusIcon from "pixelarticons/svg/minus.svg";
import GPSIcon from "pixelarticons/svg/gps.svg";
import PlusIcon from "pixelarticons/svg/plus.svg";
import CompassIcon from "pixelarticons/svg/loader.svg";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useGeolocated } from "react-geolocated";
import useDeviceOrientation from "@/components/Map/utils/useDeviceOrientation";
import { Colors } from "@/utils";
import { mapOptions } from "@/components/Map/utils";
import useIVDMapStore from "@/app/store";

type UserMarkerProps = {
  map: google.maps.Map;
};

const userMarkerIcon: google.maps.Symbol = {
  anchor: {
    x: 18,
    y: 18,
    toString: () => "(18, 18)",
    equals: (point: google.maps.Point) => point.toString() === "(18, 18)",
  },
  fillColor: Colors.primary, //"#000",
  fillOpacity: 1,
  path: "M12 20v-4H8v8H4v-4H0v12h4v-4h8v-8zM32 20v4h-4v-8h-4v12h8v4h4V20h-4zM12 12h4v4h-4zM20 12h4v4h-4zM20 4h-4v8h4V4zM20 16h-4v12h-4v4h12v-4h-4V16z",
  scale: 1,
  strokeColor: Colors.primary,
  strokeWeight: 0.1,
};
export const UserMarker: FC<UserMarkerProps> = ({ map }) => {
  const { isGeolocationEnabled, coords, getPosition } = useGeolocated({
    watchPosition: true,
  });
  const {
    lockUserPosition,
    setLockUserPosition,
    lockUserRotation,
    setLockUserRotation,
  } = useIVDMapStore((state) => ({
    lockUserPosition: state.lockUserPosition,
    setLockUserPosition: state.setLockUserPosition,
    lockUserRotation: state.lockUserRotation,
    setLockUserRotation: state.setLockUserRotation,
  }));
  const orientation = useDeviceOrientation();
  const markerRef = useRef<google.maps.Marker>(
    new google.maps.Marker({
      icon: userMarkerIcon,
      title: "your position",
    })
  );
  useEffect(() => {
    if (coords) {
      const userPosition = new google.maps.LatLng({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      markerRef.current.setPosition(userPosition);
      if (lockUserPosition) map.panTo(userPosition);
    }
  }, [coords, lockUserPosition, map]);

  useEffect(() => {
    const rotation =
      orientation?.webkitCompassHeading || orientation?.alpha || 0;
    markerRef.current.setIcon({
      ...userMarkerIcon,
      rotation,
    });

    if (lockUserRotation) console.log(map.setHeading(rotation));
  }, [orientation, lockUserRotation, map]);

  useEffect(() => {
    console.log("map effect");
    markerRef.current?.setMap(map);
  }, [map]);

  const zoom = () => {
    const currentZoom = map.getZoom();
    if (currentZoom && currentZoom < mapOptions.maxZoom!)
      map.setZoom(currentZoom + 1);
  };
  const unZoom = () => {
    const currentZoom = map.getZoom();
    if (currentZoom && currentZoom > mapOptions.minZoom!)
      map.setZoom(currentZoom - 1);
  };

  const locate = useCallback(() => {
    getPosition();
    if (coords) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom !== 15 ? 15 : 13);
      if (lockUserPosition) {
        if (lockUserRotation) {
          setLockUserRotation(false);
        } else {
          const rotation =
            orientation?.webkitCompassHeading || orientation?.alpha || 0;
          markerRef.current.setIcon({
            ...userMarkerIcon,
            rotation,
          });
          setLockUserRotation(true);
          // map.setHeading(45);
          map.moveCamera({
            heading: 45,
          });
        }
      } else {
        if (!lockUserRotation) map.setHeading(0);
        const userPos = new google.maps.LatLng({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        map.panTo(userPos);
        setLockUserPosition(true);
      }
    }
    if (!orientation && (DeviceOrientationEvent as any).requestPermission) {
      (DeviceOrientationEvent as any).requestPermission();
    }
  }, [
    getPosition,
    coords,
    orientation,
    map,
    lockUserPosition,
    lockUserRotation,
    setLockUserRotation,
    setLockUserPosition,
  ]);
  return (
    <div className="absolute bottom-14 right-2 z-10 flex flex-col gap-2">
      <button
        className="h-12 w-12 select-none border-2 border-primary bg-black p-1 text-primary"
        onClick={zoom}
      >
        <PlusIcon className="h-full w-full" />
      </button>
      <button
        className="h-12 w-12 select-none border-2 border-primary bg-black p-1 text-primary"
        onClick={unZoom}
      >
        <MinusIcon className="h-full w-full" />
      </button>
      <button
        className={clsx(
          "relative h-12 w-12 select-none border-2 border-primary bg-black p-1 text-primary",
          isGeolocationEnabled && lockUserPosition
            ? ""
            : "after:absolute after:inset-0 after:m-4 after:bg-black"
        )}
        onClick={locate}
      >
        {lockUserRotation ? (
          <CompassIcon className="h-full w-full" />
        ) : (
          <GPSIcon className="h-full w-full" />
        )}
      </button>
    </div>
  );
};

export default UserMarker;
