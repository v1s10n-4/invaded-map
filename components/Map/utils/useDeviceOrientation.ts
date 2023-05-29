"use client";
import { useEffect, useState } from "react";

type WebkitDeviceOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading: number;
  webkitCompassAccuracy: number;
};
const useDeviceOrientation = () => {
  const [orientation, setOrientation] =
    useState<WebkitDeviceOrientationEvent>();

  const handleOrientationChange = (
    orientationData: WebkitDeviceOrientationEvent
  ) => {
    setOrientation(orientationData);
  };

  useEffect(() => {
    window.addEventListener(
      "deviceorientation",
      handleOrientationChange as EventListener,
      true
    );
    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientationChange as EventListener
      );
    };
  }, []);

  return orientation;
};

export default useDeviceOrientation;
