import "./style/index.css";
import { Grid, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";

const d = new Date();
const Footer = () => {
  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      padding={1}
      sx={{
        position: { md: "fixed", sx: "fixed" },
        bottom: "0px",
        background: "#fff",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="body1" align="right">
          © {d.getFullYear()} Copyright - Hecho con{" "}
          <Favorite className="pulsate" /> por{" "}
          <a href="rojo95.github.io/portfolio" className="link">
            Johan Román
          </a>
          .
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
