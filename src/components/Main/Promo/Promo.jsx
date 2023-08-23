import React from "react";
import "./Promo.css";
import backgroundImg from "../../../images/background.png";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__containers">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img
          className="promo__img"
          src={backgroundImg}
          alt="Фоновая картинка"
        />
      </div>
      <ul className="promo__container">
        <li className="promo__link">
          <a href="#about_project" className="promo__project">
            О проекте
          </a>
        </li>
        <li className="promo__link">
          <a href="#techs" className="promo__techs">
            Технологии
          </a>
        </li>
        <li className="promo__link">
          <a href="#student" className="promo__student">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Promo;
