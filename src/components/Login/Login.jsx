import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import headerLogo from "../../images/logo.svg";
import { EmailReg, ErrorEmail, ErrorPassword } from "../../utils/constants";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onLogin(email, password);
    setIsLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let emailValidState = emailValid;
    let passwordValidState = passwordValid;
    const fieldValidationErrors = formErrors;

    switch (fieldName) {
      case "email":
        emailValidState = value.match(EmailReg);
        if (emailValidState !== null) {
          fieldValidationErrors.email =
            emailValidState[0].length === value.length ? "" : ErrorEmail;
        } else if (value === "") {
          fieldValidationErrors.email = "";
        } else {
          fieldValidationErrors.email = ErrorEmail;
        }
        break;
      case "password":
        passwordValidState = value.length >= 6;
        fieldValidationErrors.password = passwordValidState
          ? ""
          : ErrorPassword;
        if (value === "") {
          fieldValidationErrors.password = "";
        }
        break;
      default:
        break;
    }

    setEmailValid(emailValidState);
    setPasswordValid(passwordValidState);
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(emailValid && passwordValid);
  };

  return (
    <section className="login">
      <div className="login__containers">
        <div className="login__container">
          <Link to="/">
            <img className="login__logo" src={headerLogo} alt="Лого кружок" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">E-mail</label>
          <input
            required
            value={email}
            onChange={handleChange}
            type="email"
            className="login__input login__input_email"
            id="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            disabled={isLoading}
          />
          <span className="login__error">{formErrors.email}</span>
          <label className="login__label">Пароль</label>
          <input
            required
            value={password}
            onChange={handleChange}
            type="password"
            className="login__input login__input_password"
            id="password"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            disabled={isLoading}
          />
          <span className="login__error">{formErrors.password}</span>

          <div className="login__signin">
            <button
              className={`login__button-signin ${
                !formValid ? "login__button-inactive" : "login__button-active"
              } login__button`}
              disabled={!formValid || isLoading}
              aria-label="login-button"
              type="submit"
              name="login-button"
              id="login-button"
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
            <div className="login__box">
              <p className="login__ask">Ещё не зарегистрированы?</p>
              <Link to={"/signup"} className="login__signup">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
