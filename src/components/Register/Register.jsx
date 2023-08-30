import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import headerLogo from "../../images/logo.svg";
import {
  NameReg,
  EmailReg,
  ErrorName,
  ErrorEmail,
  ErrorPassword,
  ErrorRegister,
} from "../../utils/constants";

function Register({ onRegister, isShowErrorMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(name, email, password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const validateField = (fieldName, value) => {
    let nameValidState = nameValid;
    let emailValidState = emailValid;
    let passwordValidState = passwordValid;
    const fieldValidationErrors = formErrors;

    switch (fieldName) {
      case "name":
        nameValidState = value.match(NameReg);
        if (nameValidState !== null) {
          fieldValidationErrors.name =
            nameValidState[0].length === value.length ? "" : ErrorName;
        } else if (value === "") {
          fieldValidationErrors.name = "";
        } else {
          fieldValidationErrors.name = ErrorName;
        }
        break;
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

    setNameValid(nameValidState);
    setEmailValid(emailValidState);
    setPasswordValid(passwordValidState);
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(nameValid && emailValid && passwordValid);
  };

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

        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label">Имя</label>
          <input
            required
            value={name}
            onChange={handleChange}
            type="text"
            className="register__input register__input_name"
            id="name"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
          />
          <span className="register__error">{formErrors.name}</span>
          <label className="register__label">E-mail</label>
          <input
            required
            value={email}
            onChange={handleChange}
            type="email"
            className="register__input register__input_email"
            id="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
          />
          <span className="register__error">{formErrors.email}</span>
          <label className="register__label">Пароль</label>
          <input
            required
            value={password}
            onChange={handleChange}
            type="password"
            className="register__input register__input_password"
            id="password"
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
          />
          <span id="password-error" className="register__error">
            {formErrors.password}
          </span>
          <span className="register__errors">
            {isShowErrorMessage ? ErrorRegister : ""}
          </span>

          <div className="register__signup">
            <button
              className={` register__button_signup ${
                !formValid
                  ? "register__button_inactive"
                  : "register__button_active"
              } register__button`}
              disabled={!formValid}
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
        </form>
      </div>
    </section>
  );
}

export default Register;
