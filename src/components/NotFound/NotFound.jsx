import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page__error">
      <p className="page__result">404</p>
      <h1 className="page__not-found">Страница не найдена</h1>
      <h2 className="page__navigation" onClick={() => navigate(-1)}>Назад</h2>
    </div>
  );
}

export default NotFound;
