"use client";
import UserMarker from "@/app/map/UserMarker";
import colors from "@/app/map/utils/colors";
import { getMapStyle } from "@/app/map/utils/getMapStyle";
import useIVDMapStore from "@/app/store";
import { InvaderWithLocation } from "@/db";
import { Paris } from "@/utils";
import { Flex, Spinner, useThemeContext } from "@radix-ui/themes";
import {
  GoogleMap,
  GoogleMapProps,
  LoadScriptNext,
  MarkerClustererF as MarkerClusterer,
  MarkerF as Marker,
} from "@react-google-maps/api";
import { useParams, useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  clustererOptions,
  defaultGoogleMapProps,
  filterInvadersInView,
  gmapLibraries,
  mapOptions,
  markerIcon,
  markerSelectedIcon,
} from "./utils";

type Geo = typeof NextRequest.prototype.geo;
const removeGoogleCrap = () =>
  Array.from(
    document.querySelectorAll(
      `img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_gray.svg"]`
    )
  )?.forEach((el) => el.parentElement?.parentElement?.remove());

export const useMapStyles = () => {
  const theme = useThemeContext();

  const mapStyles = useMemo(() => {
    const appearance =
      theme.appearance === "inherit" ? "dark" : theme.appearance;
    const accentColors = colors[appearance][theme.accentColor];

    const sortedColors = Object.entries(accentColors)
      .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))
      .map(([, value]) => value);

    return getMapStyle(sortedColors);
  }, [theme.appearance, theme.accentColor]);

  return mapStyles;
};

export const MapView: FC<{ invaders: InvaderWithLocation[] }> = ({
  invaders,
}) => {
  const [hasZoomed, setHasZoomed] = useState<boolean>(false);
  const router = useRouter();
  const { invaderName } = useParams();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapStyles = useMapStyles();
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
        const invader = invaders.find((invader) => invader.n === invaderName);
        if (invader) map?.panTo(invader.l);
        if (!hasZoomed) {
          if (currentZoom) map?.setZoom(currentZoom + 2);
          setHasZoomed(true);
        }
      } else if (hasZoomed) {
        if (currentZoom) map.setZoom(currentZoom - 2);
        setHasZoomed(false);
      }
    }
  }, [map, invaderName, hasZoomed, invaders]);
  const onLoad: GoogleMapProps["onLoad"] = (map) => {
    const cookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)geoip\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    map.setCenter(cookie ? JSON.parse(decodeURIComponent(cookie)) : Paris);
    setMap(map);
  };
  return (
    <LoadScriptNext
      loadingElement={
        <Flex position="fixed" inset="0" align="center" justify="center">
          <Spinner size="3" />
        </Flex>
      }
      libraries={gmapLibraries}
      googleMapsApiKey={
        process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY! + `&loading=async`
      }
    >
      <GoogleMap
        {...defaultGoogleMapProps}
        options={{ ...mapOptions, styles: mapStyles }}
        onLoad={onLoad}
        onTilesLoaded={removeGoogleCrap}
        onDragStart={() => {
          setLockUserPosition(false);
          setLockUserRotation(false);
        }}
        onIdle={() => setInvadersInView(filterInvadersInView(invaders, map))}
      >
        {map && <UserMarker map={map} />}
        <MarkerClusterer
          options={clustererOptions}
          onUnmount={(ref) => ref.clearMarkers()}
        >
          {(clusterer) => (
            <>
              {invaders.map(({ i, l, n }) => (
                <Marker
                  icon={invaderName === n ? markerSelectedIcon : markerIcon}
                  key={i}
                  position={l}
                  clusterer={clusterer}
                  onClick={() => router.push(`/map/${n}`)}
                  title={n}
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
