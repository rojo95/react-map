import React from "react";
import "./style/index.css";

import { Marker as Mark, Popup } from "leaflet";

const Marker = ({ position, text }) => {
  return <Mark position={position}>{text && <Popup>{text}</Popup>}</Mark>;
};

export default Marker;
