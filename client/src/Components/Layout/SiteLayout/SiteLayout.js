import React from "react";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import { Outlet } from "react-router-dom";
const SiteLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
