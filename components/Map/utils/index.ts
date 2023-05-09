import { ClustererOptions } from '@react-google-maps/marker-clusterer';
import cluster_blue from './cluster_blue.png';
import cluster_purple from './cluster_purple.png';
import cluster_red from './cluster_red.png';
import cluster_yellow from './cluster_yellow.png';
import mapStyles from "./mapStyles.json";
import invadersLocationList from "./locations.json";
import marker from './marker.png';
import MapOptions = google.maps.MapOptions;
const markerIcon = marker.src;
export const clustererOptions: ClustererOptions = {
  styles: [{
    url: cluster_blue.src,
    width: 42,
    height: 18,
    anchorText: [-4, 0],
    textColor: '#0D0D0D',
    textSize: 10
  }, {
    url: cluster_yellow.src,
    width: 62,
    height: 27,
    anchorText: [-7, 0],
    textColor: '#0D0D0D',
    textSize: 11
  }, {
    url: cluster_red.src,
    width: 82,
    height: 36,
    anchorText: [-10, 0],
    textColor: '#0D0D0D',
    textSize: 12
  }, {
    url: cluster_purple.src,
    width: 102,
    height: 44,
    anchorText: [-15, 0],
    textColor: '#0D0D0D',
    textSize: 15
  }],
}

export const mapOptions: MapOptions = {
  minZoom:12,
  disableDefaultUI: true,
  styles: mapStyles.night
};

export { markerIcon, mapStyles, invadersLocationList };