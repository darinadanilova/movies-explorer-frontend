import React from "react";
import { Link } from "react-router-dom";
import "./LandingHeader.css";
import headerLogo from "../../images/logo.svg";

function LandingHeader() {
  return (
    <header className="landing__header">
        <img className="landing__logo" src={headerLogo} alt="Лого кружок" />
      <div className="landing__container">
        <Link to="/signup" className="landing__signup">
          Регистрация
        </Link>
        <Link to="/signin">
          <button className="landing__signin">Войти</button>
        </Link>
      </div>
    </header>
  );
}

export default LandingHeader;
