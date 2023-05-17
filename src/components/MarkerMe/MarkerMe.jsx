import "./style/index.css";

import L from "leaflet";
import { Marker } from "react-leaflet";
import iconPerson from "../../assets/img/markers/me.png";

const myIcon = L.icon({
  iconUrl: iconPerson,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function MarkerMe({ position }) {
  return (
    <Marker
      position={position}
      icon={myIcon}
      onClick={() => console.log("borrar")}
    ></Marker>
  );
}
