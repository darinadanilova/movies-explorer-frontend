import React from "react";
import { Link } from "react-router-dom";
import "./LandingHeader.css";
import headerLogo from "../../images/logo.svg";

function LandingHeader() {
  return (
    <section className="landing">
      <Link to="/">
        <img className="landing__logo" src={headerLogo} alt="Лого кружок" />
      </Link>
      <div className="landing__container">
        <Link to="/signup" className="landing__signup">
          Регистрация
        </Link>
        <Link to="/signin" className="landing__signin">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default LandingHeader;
