import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  NameReg,
  EmailReg,
  ErrorName,
  ErrorEmail,
} from "../../utils/constants";
import Validation from "../../utils/Validation";

function Profile({ editCurrentUser, handleLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    setValues,
    handleChange,
    setIsValid,
    resetForm,
  } = Validation();

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }
  }, [currentUser, setValues, setIsValid]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    editCurrentUser(values.email, values.name);
    setIsLoading(false);
    setIsEditing(false);
  };

  const validateField = (fieldName, value) => {
    const fieldValidationErrors = errors;

    switch (fieldName) {
      case "name":
        const nameValidState = value.match(NameReg);
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
        const emailValidState = value.match(EmailReg);
        if (emailValidState !== null) {
          fieldValidationErrors.email =
            emailValidState[0].length === value.length ? "" : ErrorEmail;
        } else if (value === "") {
          fieldValidationErrors.email = "";
        } else {
          fieldValidationErrors.email = ErrorEmail;
        }
        break;
      default:
        break;
    }

    setValues({ ...values, [fieldName]: value });
    setIsValid(errors.name === "" && errors.email === "");
  };

  const validateForm = () => {
    if (
      currentUser &&
      (values.name !== currentUser.name || values.email !== currentUser.email)
    ) {
      setIsValid(errors.name === "" && errors.email === "");
    } else {
      setIsValid(false);
    }
  };

  const signOut = () => {
    handleLogout();
  };

  return (
    <section className="profile">
      <Header path="/profile" isLoggedIn={false} />
      <div className="profile__containers">
        <h1 className="profile__title">
          Привет, {values.name}!
        </h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__info">
              <label className="profile__name">Имя</label>
              <input
                className="profile__input"
                required
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                placeholder="Имя"
                disabled={!isEditing || isLoading}
              />
            </div>
            <span className="profile__error">{errors.name}</span>
            <div className="profile__info">
              <label className="profile__email">E-mail</label>
              <input
                className="profile__input"
                required
                name="email"
                type="email"
                value={values.email || ''}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                placeholder="Email"
                disabled={!isEditing || isLoading}
              />
            </div>
            <span className="profile__error">{errors.email}</span>
          </fieldset>
          <div className="profile__container">
            {isEditing ? (
              <button
                type="submit"
                className={`profile__button_edit ${
                  !isValid || isLoading
                    ? "profile__button_inactive"
                    : "profile__button_active"
                } profile__edit`}
                disabled={!isValid || isLoading}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </button>
            ) : (
              <button
                type="button"
                className="profile__button_edit profile__edit"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </button>
            )}
            {!isEditing && (
              <Link
                to={"/"}
                className="profile__edit profile__logout"
                onClick={signOut}
              >
                Выйти из аккаунта
              </Link>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;