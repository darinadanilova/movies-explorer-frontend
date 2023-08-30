import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import headerLogo from "../../images/logo.svg";

function Login({ onSignInSubmit }) {
  const [signInEmail, setSignInEmail] = useState("pochta@yandex.ru");
  const [signInPassword, setSignInPassword] = useState("");

  function handleChangeEmail(e) {
    setSignInEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setSignInPassword(e.target.value);
  }

  function handleLogin(evt) {
    evt.preventDefault();
    onSignInSubmit(signInEmail, signInPassword);
  }

  return (
    <section className="login">
      <div className="login__containers">
        <div className="login__container">
          <Link to="/">
            <img className="login__logo" src={headerLogo} alt="Лого кружок" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className="login__form" onSubmit={handleLogin}>
          <label className="login__label">E-mail</label>
          <input
            required
            onChange={handleChangeEmail}
            value={signInEmail}
            type="email"
            className="login__input login__input_email"
            id="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
          />
          <label className="login__label">Пароль</label>
          <input
            required
            onChange={handleChangePassword}
            value={signInPassword}
            type="password"
            className="login__input login__input_password"
            id="password"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
          />
        </form>
        <div className="login__signin">
          <button
            className="login__button"
            aria-label="login-button"
            type="submit"
            name="login-button"
            id="login-button"
          >
            Войти
          </button>
          <div className="login__box">
            <p className="login__ask">Ещё не зарегистрированы?</p>
            <Link to={"/signup"} className="login__signup">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
