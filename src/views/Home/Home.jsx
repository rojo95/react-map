import { useRef, useState, Suspense, lazy } from "react";
import "./style/index.css";
import "leaflet/dist/leaflet.css";
import MetaTags from "react-meta-tags";

// import terminator from "@joergdietrich/leaflet.terminator";

import Swal from "sweetalert2";
import Layout from "../../components/Layout/";
import Form from "../../components/Form/";
import MapsList from "../../components/MapsList/";
import CenterSpinner from "../../components/CenterSipnner/index";

import maps from "../../assets/files/maps";

const Map = lazy(() => import("../../components/Map"));

export default function Home() {
  const [center, setCenter] = useState({ x: 0, y: 0 }); // initial center
  const [myPosition, setMyPosition] = useState(null);
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
    </>
  );
}
