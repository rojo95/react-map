import { useRef, useState } from "react";
import "./style/index.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";

// import terminator from "@joergdietrich/leaflet.terminator";

import Swal from "sweetalert2";
import Layout from "../../components/Layout/";
import Form from "../../components/Form/";
import MarkerMe from "../../components/MarkerMe";
import Marker from "../../components/Marker/";
import MapsList from "../../components/MapsList/";

const maps = [
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    name: "Urbano",
    img: "map12.png",
  },
  {
    url: "https://tile.osm.ch/switzerland/{z}/{x}/{y}.png",
    name: "Urbano 2",
    img: "map11.png",
  },
  {
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    name: "Urbano 3",
    img: "map8.png",
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    name: "Realista",
    img: "map13.png",
    light: true,
  },
  {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    name: "Vial",
    img: "map1.png",
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Vial 2",
    img: "map6.png",
  },
  {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    name: "Cartográfico",
    img: "map2.png",
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
    name: "Batimétrico",
    img: "map3.png",
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Relieve",
    img: "map4.png",
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Topográfico",
    img: "map5.png",
  },
  {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
    name: "Politico",
    img: "map7.png",
  },
  {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    name: "Politico Oscuro",
    img: "map9.png",
    light: true,
  },
  {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    name: "Orográfico",
    img: "map10.png",
  },
];

export default function Home() {
  const [center, setCenter] = useState({ x: 0, y: 0 }); // initial center
  const [myPosition, setMyPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapActive, setMapActive] = useState(0);
  const mapRef = useRef();

  /**
   * Configuration for toast by SweetAlert2
   *  @type {*} */
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  /**
   *Function to get the own position provided by the browser
   *
   */
  const ownPosition = () => {
    // geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const x = position.coords.latitude,
            y = position.coords.longitude;
          changePosition({ x, y });
          setMyPosition([x, y]);
        },
        function (error) {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // geolocation is not available
      Toast.fire({
        icon: "error",
        title: "La geolocalización no está disponible",
      });
    }
  };

  /**
   * function to set the new position
   *
   * @param {*} { x, y }
   */
  function changePosition({ x, y }) {
    const map = mapRef.current;
    map.flyTo([x, y]);
    setCenter({ x, y }); // new position
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
      ...center,
      [id]: removeNotAllowed(value),
    };
    changePosition(newVal); // new position
  }

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
    <Layout
      menuLeft={
        <Form
          ownPosition={ownPosition}
          position={center}
          changeByLatLon={changeByLatLon}
          style={{ position: "absolute" }}
        />
      }
      menuRight={<MapsList maps={maps} setMapActive={setMapActive} />}
    >
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
          ></Marker>
        ))}
        <ZoomControl position="topright" />
      </MapContainer>
    </Layout>
  );
}
