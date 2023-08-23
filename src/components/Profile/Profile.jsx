import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
  const [editName, setEditName] = useState("Виталий");
  const [editEmail, setEditEmail] = useState("pochta@yandex.ru");

  function handleChangeName(e) {
    setEditName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEditEmail(e.target.value);
  }

  return (
    <section className="profile">
      <Header path="/profile" isLoggedIn={false} />
      <div className="profile__containers">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <div className="profile__info">
              <label className="profile__name">Имя</label>
              <input
                className="profile__input"
                required
                value={editName}
                type="text"
                onChange={handleChangeName}
                placeholder="Имя"
              />
            </div>
            <div className="profile__info">
              <label className="profile__email">E-mail</label>
              <input
                className="profile__input"
                required
                value={editEmail}
                type="email"
                onChange={handleChangeEmail}
                placeholder="Email"
              />
            </div>
          </fieldset>
          <div className="profile__container">
            <button className="profile__edit" type="submit">
              Редактировать
            </button>
            <Link to={"/signin"} className="profile__logout">
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
