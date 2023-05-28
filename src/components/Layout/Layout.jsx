import { useState } from "react";
import { Drawer, Typography, IconButton, Divider, Grid } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Header from "../Header/Header";
import "./style/index.css";
import Footer from "../Footer/Footer";
import { ChevronRight } from "@mui/icons-material";

export default function Layout({ children, menuLeft, menuRight }) {
  const [openL, setOpenL] = useState(false);
  const [openR, setOpenR] = useState(false);

  function handleOpenL() {
    console.log(openL);
    setOpenL(!openL);
  }

  function handleOpenR() {
    console.log(openR);
    setOpenR(!openR);
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <>
      <header>
        <Header handleDrawerOpen={{ handleOpenL, handleOpenR }} />
        <Drawer
          sx={{
            width: { xs: 300, md: 400 },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: { xs: 300, md: 400 },
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor={"left"}
          open={openL}
        >
          <DrawerHeader sx={{ textAlign: "left" }}>
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
            <IconButton onClick={handleOpenL}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Grid item sx={{ position: "relative", overflow: "scroll" }}>
            {menuLeft}
          </Grid>
        </Drawer>
        <Drawer
          sx={{
            width: { xs: 300, md: 400 },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: { xs: 300, md: 400 },
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor={"right"}
          open={openR}
        >
          <DrawerHeader sx={{ textAlign: "left" }}>
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
              Tipo de Mapa
            </Typography>
            <IconButton onClick={handleOpenR}>
              <ChevronRight />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Grid item sx={{ position: "relative", overflow: "scroll" }}>
            {menuRight}
          </Grid>
        </Drawer>
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
