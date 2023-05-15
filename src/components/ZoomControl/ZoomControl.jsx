import { useMap } from "react-leaflet";
import { Grid, List, ListItem } from "@mui/material";
import { Add, Visibility, VisibilityOff, Remove } from "@mui/icons-material";
import "./style/index.css";

function ZoomControl({ formShowAction, show }) {
  const map = useMap();
  const disabled =
    map.getZoom() === map.getMaxZoom() || map.getZoom() === map.getMinZoom();

  function handleZoomIn() {
    if (!disabled) {
      map.setZoom(map.getZoom() + 1);
    }
  }

  function handleZoomOut() {
    if (!disabled) {
      map.setZoom(map.getZoom() - 1);
    }
  }

  return (
    <Grid item xs={1.3} className="controls">
      <List
        component="nav"
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          borderRadius: 5,
        }}
      >
        <ListItem
          onClick={handleZoomIn}
          button
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Add />
        </ListItem>
        <ListItem
          onClick={handleZoomOut}
          button
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Remove />
        </ListItem>
        <ListItem
          button
          style={{ justifyContent: "center", alignItems: "center" }}
          onClick={() => formShowAction()}
        >
          {show ? <Visibility /> : <VisibilityOff />}
        </ListItem>
      </List>
    </Grid>
  );
}

export default ZoomControl;
