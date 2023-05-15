import * as React from "react";
import Header from "../Header/Header";
import "./style/index.css";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <header>
        <Header handleDrawerOpen={handleOpen} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
