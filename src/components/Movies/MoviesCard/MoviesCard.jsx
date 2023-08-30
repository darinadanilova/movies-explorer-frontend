import React from "react";
import "./MoviesCard.css";
import Time from "../../Time/Time";
import { URL_BEATFILM_MOVIES } from "../../../utils/constants";

function MoviesCard({
  path,
  isSaved,
  movie,
  lang,
  onSaveMovie,
  onDeleteMovie,
}) {
  const duration = Time(movie.duration);
  const isInSavedMovies = path === "/saved-movies";
  const movieName = lang === "Ru" ? movie.nameRU : movie.nameEN;
  const movieImage = !isInSavedMovies
    ? `${URL_BEATFILM_MOVIES}${movie.image.url}`
    : movie.image;

  const handleSaveMovie = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    onDeleteMovie(movie, isInSavedMovies);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__containers">
        <a
          href={movie.trailerLink || "#"}
          className="movies-card-link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={movieImage}
            alt={movieName || "Изображение не загружено"}
            className="movies-card__image"
          />
        </a>
        <div className="movies-card__container">
          <div className="movies-card__list">
            <h3 className="movies-card__name">{movieName}</h3>
            <p className="movies-card__duration">{duration}</p>
          </div>
          {isSaved ? (
            <button
              className={`movies-card__selector ${
                isInSavedMovies ? "movies-card__delete" : "movies-card__saved"
              }`}
              type="button"
              aria-label="Удалить из сохранённых"
              onClick={handleDeleteMovie}
            ></button>
          ) : (
            <button
              className="movies-card__selector movies-card__save"
              type="button"
              aria-label="Добавить в сохранённые"
              onClick={handleSaveMovie}
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
