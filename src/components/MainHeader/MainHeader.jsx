import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./MainHeader.css";
import headerLogo from "../../images/logo.svg";
import headerAvatar from "../../images/avatar.svg";
import SizeScreen from "../SizeScreen/SizeScreen";

function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const screenWidth = SizeScreen();

  const isDesctop = screenWidth.width > 769;

  return (
    <>
      {isDesctop && (
        <header className="main__header">
            <img className="main__logo" src={headerLogo} alt="Лого кружок" />
          <div className="main__movies-containers">
            <div className="main__movies-container">
              <Link to="/movies" className="main__movies">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="main__saved-movies">
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className="main__avatar">
              <button className="main__profile">Аккаунт</button>
              <img className="main__img" src={headerAvatar} alt="Аватар" />
            </Link>
          </div>
        </header>
      )}
      {isOpen ? (
        <section className="popup">
          <nav className="popup__containers">
            <button
              className="popup__close"
              type="button"
              aria-label="close"
              onClick={handleClose}
            ></button>
            <ul className="popup__container">
              <li className="popup__item list-item">
                <Link to="/" className="popup__link popup__link-main">
                  Главная
                </Link>
              </li>
              <li className="popup__item list-item">
                <Link to="/movies" className="popup__link popup__link-films">
                  Фильмы
                </Link>
              </li>
              <li className="popup__item list-item">
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
        </section>
      ) : (
        <div className="burger__header">
            <img className="burger__logo" src={headerLogo} alt="Лого кружок" />
          <button
            className="burger"
            type="button"
            aria-label="burger"
            onClick={handleOpen}
          ></button>
        </div>
      )}
    </>
  );
}

export default MainHeader;
