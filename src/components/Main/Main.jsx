import React from "react";
import "./Main.css";
import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header path="/" isLoggedIn={true} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
