import { CircularProgress, Grid } from "@mui/material";

const CenterSipnner = () => {
  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default CenterSipnner;
