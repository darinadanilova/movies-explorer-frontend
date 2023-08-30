import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./MainHeader.css";
import headerLogo from "../../images/logo.svg";
import headerAvatar from "../../images/avatar.svg";
import SizeScreen from "../SizeScreen/SizeScreen";

function MainHeader({ path }) {
  const isHomePage = path === "/";
  const isMovies = path === "/movies";
  const isSavedMovies = path === "/saved-movies";
  const isProfile = path === "/profile";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const screenWidth = SizeScreen();

  const isDesctop = screenWidth.width > 769;

  return (
    <>
      {isDesctop && (
        <div className="main">
          <div className="main__movies-containers">
            <Link to="/">
              <img className="main__logo" src={headerLogo} alt="Лого кружок" />
            </Link>
            <div className="main__movies-container">
              <Link
                to="/movies"
                className={`main__link main__movies ${
                  isMovies ? "main__link_active" : ""
                } ${isHomePage ? "main__link_homepage" : ""}`}
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className={`main__link main__saved-movies ${
                  isSavedMovies ? "main__link_active" : ""
                } ${isHomePage ? "main__link_homepage" : ""}`}
              >
                Сохранённые фильмы
              </Link>
            </div>
          </div>
          <Link
            to="/profile"
            className={`main__link main__avatar ${
              isProfile ? "main__link_active" : ""
            } ${isHomePage ? "main__link_homepage" : ""}`}
          >
            <h3 className="main__profile">Аккаунт</h3>
            <img className="main__img" src={headerAvatar} alt="Аватар" />
          </Link>
        </div>
      )}
      {isMenuOpen ? (
        <div className="popup">
          <nav className="popup__containers">
            <button
              className="popup__close"
              type="button"
              aria-label="close"
              onClick={handleMenuClose}
            ></button>
            <ul className="popup__container">
              <li className="popup__item">
                <Link to="/" className="popup__link popup__link-main">
                  Главная
                </Link>
              </li>
              <li className="popup__item">
                <Link to="/movies" className="popup__link popup__link-films">
                  Фильмы
                </Link>
              </li>
              <li className="popup__item">
                <Link
                  to="/saved-movies"
                  className="popup__link popup__link-saved"
                >
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>
            <Link to="/profile" className="popup__avatar-container">
              <p className="popup__avatar">Аккаунт</p>
              <img className="popup__img" src={headerAvatar} alt="Аватар" />
            </Link>
          </nav>
        </div>
      ) : (
        <div className="burger">
          <Link to="/">
            <img className="burger__logo" src={headerLogo} alt="Лого кружок" />
          </Link>
          <button
            className={`burger__button ${
              isHomePage ? "burger__button_homepage" : ""
            }`}
            type="button"
            aria-label="burger"
            onClick={handleMenuOpen}
          ></button>
        </div>
      )}
    </>
  );
}

export default MainHeader;
