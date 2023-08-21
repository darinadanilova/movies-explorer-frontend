import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__containers">
        <p className="footer__data">© 2020</p>
        <div className="footer__container">
          <Link to="https://practicum.yandex.ru/" className="footer__link">
            Яндекс.Практикум
          </Link>
          <Link to="https://github.com/" className="footer__link">
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
