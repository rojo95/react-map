import "./style/index.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MoreVert, Menu as MenuIcon } from "@mui/icons-material";

import LogoReact from "../../assets/react.svg";

function Header({ handleDrawerOpen: { handleOpenL, handleOpenR } }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            sx={{ display: { xs: "flex" } }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenL}
            color="inherit"
            className="logo_cont"
          >
            <MenuIcon />
          </IconButton>
          <img src={LogoReact} alt="logo_react" className="logo" />
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              React Map
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <IconButton onClick={handleOpenR} sx={{ p: 0 }} color="inherit">
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
