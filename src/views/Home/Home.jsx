import { useState } from "react";
import "./style/index.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import Layout from "../../components/Layout/";
import Form from "../../components/Form/";
import MarkerMe from "../../components/MarkerMe";
import Marker from "../../components/Marker/";
// import ZoomControl from "../../components/ZoomControl/ZoomControl";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // initial position
  const [myPosition, setMyPosition] = useState(null);

  /**
   *Function to get the own position provided by the browser
   *
   */
  function ownPosition() {
    if ("geolocation" in navigator) {
      // geolocation is available
      navigator.geolocation.getCurrentPosition(
        function (position) {
          changePosition({
            x: position.coords.latitude,
            y: position.coords.longitude,
          }); // new position
          setMyPosition([position.coords.latitude, position.coords.longitude]);
        },
        function (error) {
          alert(error.message);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // geolocation is not available
      alert("Geolocation is not available");
    }
  }

  /**
   * function to set the new position
   *
   * @param {*} { x, y }
   */
  function changePosition({ x, y }) {
    setPosition({ x, y }); // new position
  }

  /**
   * Function to remove the value that is not numeric.
   *
   * @param {*} txt
   * @return {*}
   */
  function removeNotAllowed(txt) {
    const pattern = /[^0-9.-]/g;
    const cleanTXT = txt.replace(pattern, "");
    const result = isNaN(cleanTXT) ? 0 : cleanTXT;
    return result;
  }

  /**
   * Function to change the position when put the position manually
   *
   * @param {*} { target: { id, value } }
   */
  function changeByLatLon({ target: { id, value } }) {
    const newVal = {
      ...position,
      [id]: removeNotAllowed(value),
    };
    changePosition(newVal);
  }

  const [markers, setMarkers] = useState([]);

  function AddMarker() {
    useMapEvents({
      click: (e) => {
        const pos = e.latlng;
        const newMarker = {
          id: Math.random(), // Genera un ID aleatorio para el marcador
          position: pos,
        };
        setMarkers([...markers, newMarker]);
        // setPosition({ x: pos.lat, y: pos.lng });
      },
    });
    return null;
  }

  const addMarker = (e) => {
    const newMarker = {
      id: Math.random(), // Genera un ID aleatorio para el marcador
      position: e.latlng,
    };
    setMarkers([...markers, newMarker]);
  };

  const removeMarker = (id) => {
    const pos = markers.filter((marker) => marker.id === id);
    setPosition({ x: pos[0].position.lat, y: pos[0].position.lng });
    setMarkers(markers.filter((marker) => marker.id !== id));
  };

  return (
    <Layout
      form={
        <Form
          ownPosition={ownPosition}
          position={position}
          changeByLatLon={changeByLatLon}
          style={{ position: "absolute" }}
        />
      }
    >
      <MapContainer
        center={[position.x, position.y]}
        zoom={5}
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {myPosition && <MarkerMe position={myPosition} />}
        <MapCenter center={[position.x, position.y]} />
        <AddMarker />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            id={marker.id}
            position={marker.position}
            draggable={true}
            onClick={removeMarker}
          ></Marker>
        ))}
        <ZoomControl position="topright" />
        {/* <ZoomControl show={show} formShowAction={formShowAction}></ZoomControl> */}
      </MapContainer>
    </Layout>
  );
}

/**
 * Function to center tthe map in a new ubication
 * providing the latitude and longitude
 *
 * @param {*} { center }
 * @return {*}
 */
function MapCenter({ center }) {
  const map = useMap();
  map.flyTo(center); // sets center of map to new position
  return null;
}
