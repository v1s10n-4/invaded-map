import { ClustererOptions } from "@react-google-maps/marker-clusterer";
import cluster_blue from "./cluster_blue.png";
import cluster_purple from "./cluster_purple.png";
import cluster_red from "./cluster_red.png";
import cluster_yellow from "./cluster_yellow.png";
import mapStyles from "@/utils/mapStyles.json";
import invaders from "./locations.json";
import marker from "./marker.svg?url";
import userPosition from "./userPosition.svg?url";
import { GoogleMapProps } from "@react-google-maps/api";
import { Paris } from "@/utils";
import { Library } from "@googlemaps/js-api-loader";
import MapOptions = google.maps.MapOptions;
import LatLngLiteral = google.maps.LatLngLiteral;

export type Invader = {
  url: string[];
  name: string;
  points: number;
  reportDate: number;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  address?: string;
};

export type InvaderWithLocation = Invader & {
  lat: number;
  lng: number;
  address: string;
};

const invadersLocationList = invaders as InvaderWithLocation[];
const markerIcon = marker.src;
const userPositionIcon = userPosition.src;
export const clustererOptions: ClustererOptions = {
  styles: [
    {
      url: cluster_blue.src,
      width: 42,
      height: 18,
      anchorText: [-4, 0],
      textColor: "#0D0D0D",
      textSize: 10,
    },
    {
      url: cluster_yellow.src,
      width: 62,
      height: 27,
      anchorText: [-7, 0],
      textColor: "#0D0D0D",
      textSize: 11,
    },
    {
      url: cluster_red.src,
      width: 82,
      height: 36,
      anchorText: [-10, 0],
      textColor: "#0D0D0D",
      textSize: 12,
    },
    {
      url: cluster_purple.src,
      width: 102,
      height: 44,
      anchorText: [-15, 0],
      textColor: "#0D0D0D",
      textSize: 15,
    },
  ],
};

export const mapOptions: MapOptions = {
  mapId: "bc9e5a99ff21e1e7",
  heading: 0,
  tilt: 0,
  minZoom: 10,
  maxZoom: 20,
  disableDefaultUI: true,
};

export const defaultGoogleMapProps: GoogleMapProps = {
  center: Paris,
  zoom: 10,
  options: mapOptions,
  mapContainerStyle: {
    width: "100%",
    height: "100%",
  },
};

type Libraries = (
  | "geometry"
  | "drawing"
  | "localContext"
  | "places"
  | "visualization"
)[];
export const gmapLibraries = ["geometry"] as Library[];

export const getInvader: (name: string) => InvaderWithLocation | undefined = (
  name
) => {
  return invadersLocationList.find((invader) => invader.name === name);
};
export const getLatLng: (invader: InvaderWithLocation) => LatLngLiteral = (
  invader
) => ({ lat: invader.lat, lng: invader.lng });

export const filterInvadersInView: (
  map: google.maps.Map | null
) => InvaderWithLocation[] = (map) => {
  if (!map) return [];
  const bounds = map.getBounds();
  const center = map.getCenter();
  if (!bounds || !center) return [];
  return invadersLocationList
    .filter(({ lat, lng }) => bounds.contains({ lat, lng }))
    .sort((m1, m2) => {
      const d1 = google.maps.geometry.spherical.computeDistanceBetween(center, {
        lat: m1.lat,
        lng: m1.lng,
      });
      const d2 = google.maps.geometry.spherical.computeDistanceBetween(center, {
        lat: m2.lat,
        lng: m2.lng,
      });
      return d1 - d2;
    });
};

export { markerIcon, mapStyles, userPositionIcon, invadersLocationList };
