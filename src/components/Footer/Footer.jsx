import "./style/index.css";

import { Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Favorite } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const d = new Date();
const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center" alignItems="center" padding={2}>
        <Grid item>
          <Typography variant="body1" align="center">
            © {d.getFullYear()} Copyright - Hecho con{" "}
            <Favorite className="pulsate" /> por Johan Román.
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Footer;
