import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import headerLogo from "../../images/logo.svg";

function Register({ onSignUpSubmit }) {
  const [name, setName] = useState("Виталий");
  const [signUpEmail, setSignUpEmail] = useState("pochta@yandex.ru");
  const [signUpPassword, setSignUpPassword] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setSignUpEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setSignUpPassword(e.target.value);
  }

  function handleRegister(evt) {
    evt.preventDefault();
    onSignUpSubmit(name, signUpEmail, signUpPassword);
  }

  return (
    <section className="register">
      <div className="register__containers">
        <div className="register__container">
          <Link to="/">
            <img
              className="register__logo"
              src={headerLogo}
              alt="Лого кружок"
            />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>

        <form className="register__form" onSubmit={handleRegister}>
          <label className="register__label">Имя</label>
          <input
            required
            onChange={handleChangeName}
            value={name}
            type="text"
            className="register__input register__input_name"
            id="name"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
          />
          <label className="register__label">E-mail</label>
          <input
            required
            onChange={handleChangeEmail}
            value={signUpEmail}
            type="email"
            className="register__input register__input_email"
            id="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
          />
          <label className="register__label">Пароль</label>
          <input
            required
            onChange={handleChangePassword}
            value={signUpPassword}
            type="password"
            className="register__input register__input_password"
            id="password"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
          />
          <span id="password-error" className="register__error">
            Что-то пошло не так...
          </span>
        </form>
        <div className="register__signup">
          <button
            className="register__button"
            aria-label="register-button"
            type="submit"
            name="register-button"
            id="register-button"
          >
            Зарегистрироваться
          </button>
          <div className="register__box">
            <p className="register__ask">Уже зарегистрированы?</p>
            <Link to={"/signin"} className="register__signin">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
