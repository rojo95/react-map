import { useState } from "react";
import { Drawer, Typography, IconButton, Divider, Grid } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Header from "../Header/Header";
import "./style/index.css";
import Footer from "../Footer/Footer";

export default function Layout({ children, form }) {
  const [open, setOpen] = useState(true);

  function handleOpen() {
    console.log(open)
    setOpen(!open);
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
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <Typography
              variant='h6'
              noWrap
              component='p'
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
            <IconButton onClick={handleOpen}>{<ChevronLeft />}</IconButton>
          </DrawerHeader>
          <Divider />
          <Grid Item sx={{position: 'relative'}}>
            {form}
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
