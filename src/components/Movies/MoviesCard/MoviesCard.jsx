import React from "react";
import "./MoviesCard.css";

function MoviesCard({ name, link, duration, isSavedFilms }) {
  const [isSave, setIsSave] = React.useState(false);

  const handleSaveClick = () => {
    setIsSave(!isSave);
  };

  React.useEffect(() => {
    const saveFilm = localStorage.getItem("movieSave");
    setIsSave(saveFilm === "true");
  }, []);

  React.useEffect(() => {
    localStorage.setItem("movieSave", isSave);
  }, [isSave]);

  return (
    <section className="movies-card">
      <div className="movies-card__containers">
        <img src={link} alt={name} className="movies-card__image" />
        <div className="movies-card__container">
          <div className="movies-card__list">
            <h3 className="movies-card__name">{name}</h3>
            <p className="movies-card__duration">{duration}</p>
          </div>
          {isSavedFilms ? (
            <button
              className="movies-card__delete"
              type="button"
              aria-label="delete"
            ></button>
          ) : (
            <button
              className={`movies-card__save ${
                isSave ? "movies-card__saved" : ""
              }`}
              type="button"
              aria-label="like"
              onClick={handleSaveClick}
            ></button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MoviesCard;
