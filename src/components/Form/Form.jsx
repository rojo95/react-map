import { useState } from "react";
import axios from "axios";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";

import "./style/index.css";
import map from "../../assets/img/wood_map.jpg";

export default function Form({
  position,
  className,
  ownPosition,
  changeByLatLon,
  changePosition,
  handleModal,
}) {
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchCity = ({ target: { value } }) => {
    setLoading(true);
    setPlace(value);
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Grid
      container
      spacing={1}
      className={className}
      xs={12}
      md={12}
      item
      sx={{ width: "100%" }}
    >
      <Grid item xs={12}>
        <CardMedia sx={{ height: 140 }} image={map} />
        <CardContent>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ display: "flex", marginBottom: 2 }}
          >
            <TextField
              id="city"
              label="Ciudad"
              variant="outlined"
              value={place}
              fullWidth
              onChange={(e) => searchCity(e)}
            />
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ display: "flex" }}
          >
            <TextField
              sx={{ marginRight: 1 }}
              id="lat"
              label="Latitud"
              variant="outlined"
              type="number"
              value={position.lat}
              onChange={(e) => changeByLatLon(e)}
            />
            <TextField
              sx={{ marginLeft: 1 }}
              id="lon"
              label="Longitud"
              variant="outlined"
              type="number"
              value={position.lon}
              onChange={(e) => changeByLatLon(e)}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={ownPosition}>
            Ir a mi Posición
          </Button>
          <Button size="small" onClick={() => handleModal()}>
            Indicaciones
          </Button>
        </CardActions>
        <CardContent>
          <Grid container>
            {loading ? (
              <Grid item xs={12} textAlign={"center"}>
                <CircularProgress />
              </Grid>
            ) : (
              places.map((vals, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  textAlign={"left"}
                  className="item"
                  onClick={() =>
                    changePosition({ lat: vals.lat, lon: vals.lon })
                  }
                >
                  {vals.display_name}
                </Grid>
              ))
            )}
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
}
