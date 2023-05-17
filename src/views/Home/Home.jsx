import { useState } from "react";
import "./style/index.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import Layout from "../../components/Layout/";
import Form from "../../components/Form/";
import MarkerMe from "../../components/MarkerMe/MarkerMe";
// import ZoomControl from "../../components/ZoomControl/ZoomControl";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // initial position
  const [markers, setMarkers] = useState([]); // markers in the map
  const [myPosition, setMyPosition] = useState(null);

  //   const [show, setShow] = useState(false); // show the form

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

  const handleMapClick = (e) => {
    console.log(e.latlng);
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
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&copy; <a href="https://rojo95/github.io/portfolio">Portafolio</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {myPosition && <MarkerMe position={myPosition} />}
        {/* .map((data, i) => (
            <Marker
              key={i}
              position={[data.position.x, data.position.y]}
              name={data.name}
            />
          )) */}
        <MapCenter center={[position.x, position.y]} />
        <AddMarker markers={markers} setMarkers={setMarkers} />
        <ZoomControl position='topright' />
        {/* <ZoomControl show={show} formShowAction={formShowAction}></ZoomControl> */}
      </MapContainer>
    </Layout>
  );
}

function AddMarker() {
  const [markers, setMarkers] = useState([]);
  useMapEvents({
    click(e) {
      setMarkers([...markers, e.latlng]);
      //   map.locate();
    },
    // locationfound(e) {
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
  });

  markers.map((v, i) => {
    console.log([v.lat, v.lng]);

    <Marker key={i} position={[v.lat, v.lng]}></Marker>;
  });
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
