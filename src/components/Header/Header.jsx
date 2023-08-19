import React from "react";
import "./Header.css";
import LandingHeader from "../LandingHeader/LandingHeader";
import MainHeader from "../MainHeader/MainHeader";

function Header({ path, isLoggedIn }) {
  const isBurger =
    path === "/movies" || path === "/saved-movies" || path === "/profile";
  return (
    <header className={`header ${isBurger ? "header__hide" : ""}`}>
      {isLoggedIn ? <LandingHeader /> : <MainHeader />}
    </header>
  );
}

export default Header;
