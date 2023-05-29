import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";

export default function Map() {
  const [position, setPosition] = useState([0, 0]); // initial position

  function changePosition() {
    if ("geolocation" in navigator) {
      // geolocation is available
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition([position.coords.latitude, position.coords.longitude]); // new position
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // geolocation is not available
      console.error("Geolocation is not available");
    }
  }

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <button onClick={changePosition}>Change Position</button>
      <MapCenter center={position} />
    </MapContainer>
  );
}

function MapCenter({ center }) {
  const map = useMap();
  map.setView(center); // sets center of map to new position
  return null;
}
