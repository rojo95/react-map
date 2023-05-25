import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import Marker from "../Marker";
import MarkerMe from "../MarkerMe";

function Map({ center, mapRef, maps, myPosition, mapActive }) {
  function AddMarker() {
    useMapEvents({
      click: (e) => {
        const pos = e.latlng;
        const newMarker = {
          id: Math.random(), // Genera un ID aleatorio para el marcador
          position: pos,
        };
        setMarkers([...markers, newMarker]);
      },
    });
    return null;
  }
  const [markers, setMarkers] = useState([]);
  const addMarker = (e) => {
    const newMarker = {
      id: Math.random(), // Genera un ID aleatorio para el marcador
      position: e.latlng,
    };
    setMarkers([...markers, newMarker]);
  };

  const removeMarker = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
  };
  return (
    <MapContainer
      center={[center.x, center.y]}
      zoom={5}
      ref={mapRef}
      scrollWheelZoom={true}
      zoomControl={false}
      eventHandlers={{
        click: () => {
          addMarker;
        },
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://rojo95/github.io/portfolio">Portafolio</a>'
        url={maps[mapActive].url}
        minZoom={3} // Nivel mínimo de zoom permitido
      />
      {myPosition && <MarkerMe position={myPosition} />}
      {/* <MapCenter center={[center.x, center.y]} /> */}
      <AddMarker />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          id={marker.id}
          position={marker.position}
          draggable={true}
          onClick={removeMarker}
        />
      ))}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}

export default Map;
