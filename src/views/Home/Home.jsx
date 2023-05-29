import { useRef, useState, Suspense, lazy } from "react";
import "./style/index.css";
import "leaflet/dist/leaflet.css";
import MetaTags from "react-meta-tags";
import L from "leaflet";
import "leaflet-routing-machine";

import Layout from "../../components/Layout/";
import Form from "../../components/Form/";
import MapsList from "../../components/MapsList/";
import CenterSpinner from "../../components/CenterSipnner/index";

import maps from "../../assets/files/maps";
import Modal from "../../components/Modal/Modal";
import NotificationMessage from "../../components/Notifications/Notifications";

const Map = lazy(() => import("../../components/Map"));

export default function Home() {
  const [center, setCenter] = useState({ lat: 0, lon: 0 }); // initial center
  const [myPosition, setMyPosition] = useState(null);
  const [mapActive, setMapActive] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const mapRef = useRef();

  /**
   *Function to get the own position provided by the browser
   *
   */
  const ownPosition = () => {
    // geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude,
            lon = position.coords.longitude;
          changePosition({ lat, lon });
          setMyPosition([lat, lon]);
        },
        function (error) {
          NotificationMessage("error", error.message);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      // geolocation is not available
      NotificationMessage("error", "La geolocalización no está disponible");
    }
  };

  /**
   * function to set the new position
   *
   * @param {*} { lat, lon }
   */
  function changePosition({ lat, lon }) {
    const map = mapRef.current;
    map.flyTo([lat, lon]);
    setCenter({ lat, lon }); // new position
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

  function addRoute(from, to) {
    const map = mapRef.current;
    L.Routing.control({
      waypoints: [L.latLng(from), L.latLng(to)],
    }).addTo(map);
  }

  const deleteRoute = () => {
    const map = mapRef.current;
    if (map && map instanceof L.Map) {
      // check if the instance is of type L.Map
      map.eachLayer((layer) => {
        // check if the layer is not the TileLayer
        if (!(layer instanceof L.TileLayer)) {
          // check if the layer is of type L.Layer
          if (layer instanceof L.Layer) {
            map.removeLayer(layer); // remove the layer from the map
          }
        }
      });
    }
  };

  function handleModal() {
    setOpenModal(!openModal);
  }
  return (
    <>
      <MetaTags>
        <title>React Map</title>
        <meta
          name="description"
          content="Web dedicada al posicionamiento global."
        />
        <meta property="og:title" content="React Map" />
        {/* <meta property="og:image" content="../../assets/react.svg" /> */}
      </MetaTags>
      <Layout
        menuLeft={
          <Form
            ownPosition={ownPosition}
            position={center}
            changeByLatLon={changeByLatLon}
            style={{ position: "absolute" }}
            changePosition={changePosition}
            handleModal={handleModal}
          />
        }
        menuRight={<MapsList maps={maps} setMapActive={setMapActive} />}
      >
        <Suspense fallback={<CenterSpinner />}>
          <Map
            center={center}
            maps={maps}
            myPosition={myPosition}
            mapActive={mapActive}
            mapRef={mapRef}
          />
        </Suspense>
      </Layout>
      <Modal
        openModal={openModal}
        handleModal={handleModal}
        addRoute={addRoute}
        deleteRoute={deleteRoute}
        center={center}
      ></Modal>
    </>
  );
}
