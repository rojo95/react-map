// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker as Mark,
// //   Popup,
// //   useMap,
// //   useMapEvent,
// // } from "react-leaflet";

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import "leaflet/dist/leaflet.css";

// import {
//   MapContainer,
//   TileLayer,
//   Marker as Mark,
//   Popup,
//   useMap,
// } from "react-leaflet";

// const Marker = ({ position, text }) => {
//   return <Mark position={position}>{text && <Popup>{text}</Popup>}</Mark>;
// };

// export default function App() {
//   const [position, setPosition] = useState([6.42375, -66.58973]);
//   const [markers] = useState([
//     {
//       position: [6.42375, -66.58973],
//       name: "Johan",
//     },
//     {
//       position: [51.508, -0.07],
//       name: "Angel",
//     },
//     {
//       position: [51.55, -0.01],
//       name: "Granda",
//     },
//   ]);

//   // const map = useMap();
//   const ChangeView = (center, zoom) => {
//     console.log(center);
//     //   map.setView(center, zoom);
//     //   return null;
//   };

//   useEffect(() => {
//     ChangeView([0, 0], 13);
//   }, []);

//   return (
//     <>
//       <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
//         <TileLayer
//           attribution='&copy; <a href="https://rojo95/github.io/portfolio">Portafolio</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {markers.map((v, i) => (
//           <Marker key={i} position={v.position} text={v.name} />
//         ))}
//       </MapContainer>
//     </>
//   );
// }

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
