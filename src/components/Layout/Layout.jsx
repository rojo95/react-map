import { useState } from "react";
import { Drawer, Typography, IconButton, Divider, Grid } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Header from "../Header/Header";
import "./style/index.css";
import Footer from "../Footer/Footer";
import { ChevronRight } from "@mui/icons-material";

export default function Layout({ children, menuLeft, menuRight }) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState(true);

  function handleOpen(side = true) {
    console.log(open);
    setOpen(!open);
    setSide(side);
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
        <Header handleDrawerOpen={handleOpen} />
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
          anchor={side ? "left" : "right"}
          open={open}
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
            <IconButton onClick={() => handleOpen(side ? true : false)}>
              {side ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Grid item sx={{ position: "relative", overflow: "scroll" }}>
            {side ? menuLeft : menuRight}
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
