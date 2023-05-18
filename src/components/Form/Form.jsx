import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import map from "../../assets/img/wood_map.jpg";

export default function Form({
  position,
  className,
  ownPosition,
  changeByLatLon,
}) {
  return (
    <Grid
      container
      spacing={1}
      className={className}
      xs={12}
      md={12}
      item
      sx={{ position: "absolute", width: "100%" }}
    >
      <Grid item xs={12}>
        <CardMedia sx={{ height: 140 }} image={map} title="green iguana" />
        <CardContent>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ display: "flex", marginBottom: 2 }}
          >
            <TextField id="city" label="Ciudad" variant="outlined" fullWidth />
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ display: "flex" }}
          >
            <TextField
              sx={{ marginRight: 1 }}
              id="x"
              label="Latitud"
              variant="outlined"
              type="number"
              value={position.x}
              onChange={(e) => changeByLatLon(e)}
            />
            <TextField
              sx={{ marginLeft: 1 }}
              id="y"
              label="Longitud"
              variant="outlined"
              type="number"
              value={position.y}
              onChange={(e) => changeByLatLon(e)}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Search Ubication</Button>
          <Button size="small" onClick={ownPosition}>
            Go My Position
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
}
