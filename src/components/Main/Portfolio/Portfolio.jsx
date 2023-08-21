import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__containers">
        <li className="portfolio__container">
          <Link
            to="https://github.com/darinadanilova/first-project"
            className="portfolio__link"
            target="_blank"
          >
            Статичный сайт
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__container">
          <Link
            to="https://github.com/darinadanilova/react-mesto-api-full-gha"
            className="portfolio__link"
            target="_blank"
          >
            Адаптивный сайт
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__container">
          <Link
            to="https://github.com/darinadanilova/second-project"
            className="portfolio__link"
            target="_blank"
          >
            Одностраничное приложение
            <span className="portfolio__arrow">&#8599;</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
