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

function Profile({ editCurrentUser, handleLogout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameValid, setNameValid] = useState([]);
  const [emailValid, setEmailValid] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    editCurrentUser(email, name);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const validateField = (fieldName, value) => {
    let nameValidState = nameValid;
    let emailValidState = emailValid;
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
      default:
        break;
    }

    setNameValid(nameValidState);
    setEmailValid(emailValidState);
    setFormErrors(fieldValidationErrors);
    validateForm();
  };

  const validateForm = () => {
    if (
      currentUser &&
      name === currentUser.name &&
      email === currentUser.email
    ) {
      setFormValid(false);
    } else {
      setFormValid(formErrors.name === "" && formErrors.email === "");
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
          Привет, {currentUser && currentUser.name ? currentUser.name : name}!
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
                value={name}
                onChange={handleChange}
                placeholder="Имя"
                disabled={!isEditing}
              />
            </div>
            <span className="profile__error">{formErrors.name}</span>
            <div className="profile__info">
              <label className="profile__email">E-mail</label>
              <input
                className="profile__input"
                required
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                disabled={!isEditing}
              />
            </div>
            <span className="profile__error">{formErrors.email}</span>
          </fieldset>
          <div className="profile__container">
            {isEditing ? (
              <button
                type="submit"
                className={`profile__button_edit ${
                  !formValid
                    ? "profile__button_inactive"
                    : "profile__button_active"
                } profile__edit`}
                disabled={!formValid}
              >
                Сохранить
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
                to={"/signin"}
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
