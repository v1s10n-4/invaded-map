"use client";
import React from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { clustererOptions, invadersLocationList, mapOptions, markerIcon } from './utils';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 48.861071,
  lng: 2.350494,
}

export const Map = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        <MarkerClusterer options={clustererOptions}>
          {(clusterer) =>
            <>
              {invadersLocationList.map(({ lat, lng }) => (
                <Marker icon={markerIcon} key={`${lat}${lng}`} position={{ lat, lng }} clusterer={clusterer}/>
              ))}
            </>
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  )
}
export default Map;