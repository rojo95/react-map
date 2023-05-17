import "./style/index.css";
import { Grid, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";

const d = new Date();
const Footer = () => {
  return (
    <Grid
      container
      justify='flex-end'
      alignItems='center'
      padding={2}
      sx={{
        position: { md: "block", sx: "fixed" },
        bottom: "0px",
        background: "#fff",
      }}
    >
      <Grid item xs={12}>
        <Typography variant='body1' align='right'>
          © {d.getFullYear()} Copyright - Hecho con{" "}
          <Favorite className='pulsate' /> por Johan Román.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
