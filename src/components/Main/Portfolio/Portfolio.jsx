import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__containers">
        <li className="portfolio__container">
          <Link to="https://github.com/" className="portfolio__link">
            Статичный сайт
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__container">
          <Link to="https://github.com/" className="portfolio__link">
            Адаптивный сайт
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__container">
          <Link to="https://github.com/" className="portfolio__link">
            Одностраничное приложение
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
