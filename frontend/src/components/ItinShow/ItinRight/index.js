import React, { useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

function ItinRight(props) {
  //   if (isLoaded) return <div>loading...</div>;

  return (
    <>
      <Map />
    </>
  );
}
const center = {
  lat: 39.8283,
  lng: -98.5795,
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBI_P4tlIGu9YjsHmSkqSZnxKyy6t4bWWo",
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    async function calculateRoute() {
      const originRef = new window.google.maps.LatLng(45.5051, -122.675);
      const destiantionRef = new window.google.maps.LatLng(47.6062, -122.3321);
      if (
        originRef === "" ||
        destiantionRef === ""
      ) {
        return;
      }
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef,
        destination: destiantionRef,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
    }
  }, []);


  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default ItinRight;
