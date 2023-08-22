import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { filmCards, savedFilms } from "../../../utils/constants";

function MoviesCardList({ isSavedFilms, isMoreFilms }) {
  return (
    <div className={`movies-list ${isSavedFilms ? "movies-list_saved" : ""}`}>
      <ul className="movies-list__cards">
        {isSavedFilms
          ? savedFilms
              .filter((movie) => movie.isSave)
              .map((movie) => (
                <MoviesCard
                  key={movie.id}
                  name={movie.name}
                  link={movie.link}
                  duration={movie.duration}
                  isSave={movie.isSave}
                  isSavedFilms={isSavedFilms}
                />
              ))
          : filmCards.map((movie) => (
              <MoviesCard
                key={movie.id}
                name={movie.name}
                link={movie.link}
                duration={movie.duration}
                isSave={movie.isSave}
                isSavedFilms={isSavedFilms}
              />
            ))}
      </ul>
      {isMoreFilms && <button className="movies-list__button">Ещё</button>}
    </div>
  );
}

export default MoviesCardList;