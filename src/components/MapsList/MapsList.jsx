import { useState } from "react";
import "./style/index.css";

const MapsList = ({ maps, setMapActive, setMap3d }) => {
  const [active, setActive] = useState(0);
  const activeMap = (i) => {
    setMapActive(i);
    setActive(i);
  };

  return (
    <>
      {maps.map((vals, i) => (
        <div
          key={i}
          onClick={() => {
            activeMap(i);
            setMap3d(vals.map3D ? true : false);
          }}
          className={`option ${active === i ? "active" : ""}`}
        >
          <p className={`title ${vals.light ? "text-white" : ""}`}>
            {vals.name || "Empty"}
          </p>
          <img src={vals.img} alt={vals.name} />
        </div>
      ))}
    </>
  );
};

export default MapsList;
