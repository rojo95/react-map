import map12 from "../img/maps/map12.png";
import map11 from "../img/maps/map11.png";
import map8 from "../img/maps/map8.png";
import map13 from "../img/maps/map13.png";
import map1 from "../img/maps/map1.png";
import map6 from "../img/maps/map6.png";
import map2 from "../img/maps/map2.png";
import map3 from "../img/maps/map3.png";
import map4 from "../img/maps/map4.png";
import map5 from "../img/maps/map5.png";
import map7 from "../img/maps/map7.png";
import map10 from "../img/maps/map10.png";

const maps = [
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    name: "Urbano",
    img: map12,
  },
  {
    url: "https://tile.osm.ch/switzerland/{z}/{x}/{y}.png",
    name: "Urbano 2",
    img: map11,
  },
  {
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    name: "Urbano 3",
    img: map8,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    name: "Realista",
    img: map13,
    light: true,
  },
  {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    name: "Vial",
    img: map1,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Vial 2",
    img: map6,
  },
  {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    name: "Cartográfico",
    img: map2,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
    name: "Batimétrico",
    img: map3,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Relieve",
    img: map4,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
    name: "Topográfico",
    img: map5,
  },
  {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
    name: "Politico",
    img: map7,
  },
  {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    name: "Orográfico",
    img: map10,
  },
];

export default maps;
