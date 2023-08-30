import { React, useContext } from "react";
import "./Header.css";
import LandingHeader from "../LandingHeader/LandingHeader";
import MainHeader from "../MainHeader/MainHeader";
import { LoggedContext } from "../../contexts/LoggedContext";

function Header({ path }) {
  const isHomePage = path === "/";
  const isLoggedIn = useContext(LoggedContext);
  return (
    <header className={`header ${isHomePage ? "header_hide" : ""}`}>
      {isLoggedIn ? <MainHeader path={path} /> : <LandingHeader />}
    </header>
  );
}

export default Header;
