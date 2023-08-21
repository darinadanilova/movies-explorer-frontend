import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__header">О проекте</h2>
      <div className="about__diploma">
        <div className="about__container">
          <p className="about__title">Дипломный проект включал 5 этапов</p>
          <span className="about__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </span>
        </div>
        <div className="about__container">
          <p className="about__title">На выполнение диплома ушло 5 недель</p>
          <span className="about__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </span>
        </div>
      </div>
      <div className="about__times">
        <div className="about__times-containers">
          <div className="about__week">1 неделя</div>
          <div className="about__stack">Back-end</div>
        </div>
        <div className="about__times-container">
          <div className="about__weeks">4 недели</div>
          <div className="about__stack">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
