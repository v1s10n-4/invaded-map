"use client";
import { useCallback, useEffect, useState } from "react";

type WebkitDeviceOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading: number;
  webkitCompassAccuracy: number;
};
const useDeviceOrientation = () => {
  const [alreadyRequested, setAlreaderRequested] = useState<boolean>(false);
  const [orientation, setOrientation] =
    useState<WebkitDeviceOrientationEvent>();

  const handleOrientationChange = (
    orientationData: WebkitDeviceOrientationEvent
  ) => {
    setOrientation(orientationData);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientationChange as EventListener
      );
    };
  }, []);

  const requestPermission = useCallback(() => {
    if (!alreadyRequested) {
      setAlreaderRequested(true);
      window.addEventListener(
        "deviceorientation",
        handleOrientationChange as EventListener,
        true
      );
    }
  }, [alreadyRequested]);

  return { orientation, requestPermission };
};

export default useDeviceOrientation;
