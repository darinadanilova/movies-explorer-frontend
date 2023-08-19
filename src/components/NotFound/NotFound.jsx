import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="page__error">
      <p className="page__result">404</p>
      <h1 className="page__not-found">Страница не найдена</h1>
      <h2 className="page__navigation">Назад</h2>
    </div>
  );
}

export default NotFound;
