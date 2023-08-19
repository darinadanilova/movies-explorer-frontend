import React from "react";
import "./AboutMe.css";
import photoStudent from "../../../images/photo.png";

function AboutMe() {
  return (
    <section className="information">
      <h2 className="information__header">Студент</h2>
      <div className="information__container">
        <div className="information__text">
          <h1 className="information__title">Виталий</h1>
          <h2 className="information__subtitle">
            Фронтенд-разработчик, 30 лет
          </h2>
          <span className="information__life">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </span>
          <a href="https://github.com" className="information__link">
            Github
          </a>
        </div>
        <div className="information__photo-container">
          <img
            className="information__photo"
            src={photoStudent}
            alt="Фотография студента"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
