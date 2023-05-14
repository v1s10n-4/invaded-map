import { ClustererOptions } from "@react-google-maps/marker-clusterer";
import cluster_blue from "./cluster_blue.png";
import cluster_purple from "./cluster_purple.png";
import cluster_red from "./cluster_red.png";
import cluster_yellow from "./cluster_yellow.png";
import mapStyles from "./mapStyles.json";
import invaders from "./locations.json";
import marker from "./marker.png";
import MapOptions = google.maps.MapOptions;
import { LoadScriptUrlOptions } from "@react-google-maps/api/src/utils/make-load-script-url";
import { GoogleMapProps } from "@react-google-maps/api";
import LatLng = google.maps.LatLng;
import LatLngLiteral = google.maps.LatLngLiteral;

export type Invader = {
  url: string[];
  name: string;
  points: number;
  reportDate: number;
  city: string;
  state: string;
};

export type InvaderWithLocation = Invader & {
  lat: number;
  lng: number;
  address: string;
};

const invadersLocationList = invaders as InvaderWithLocation[];
const markerIcon = marker.src;
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
  minZoom: 12,
  disableDefaultUI: true,
  styles: mapStyles.sixtyfour,
};

const Paris: LatLngLiteral = {
  lat: 48.861071,
  lng: 2.350494,
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

export const gmapLibraries: LoadScriptUrlOptions["libraries"] = ["geometry"];

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

export { markerIcon, mapStyles, invadersLocationList };
