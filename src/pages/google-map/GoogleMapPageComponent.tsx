import React, { useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './GoogleMapPageComponent.module.css';
import { VITE_GOOGLE_MAPS_API_KEY } from "@/utils/constants";

import { GoogleMap, LoadScript, Marker, useJsApiLoader  } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.73061,  // You can change this
  lng: -73.935242
};


const GoogleMapPageComponent: React.FC = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // 👈 Required for autocomplete
  });

  const inputRef = useRef(null);
  const [position, setPosition] = React.useState(center);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          setPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      });
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading…</div>;
  

   return (
    <>
    <div>
        <h1>Google Page</h1>
    </div>

{/*
    <div>
       <LoadScript googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
           
            <Marker position={{ lat: 40.73061, lng: -73.935242 }} />
          </GoogleMap>
      </LoadScript>
    </div>
*/}


      
    <br />

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search address..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={14}
        >
          <Marker position={position} />
        </GoogleMap>
    </div>

       
    </>

  );

};

export default GoogleMapPageComponent;
