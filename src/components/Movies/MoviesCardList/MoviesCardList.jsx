/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { NotFoundMessage, ErrorRequest } from "../../../utils/constants";
import Preloader from "../Preloader/Preloader";
import SizeScreen from "../../SizeScreen/SizeScreen";

function MoviesCardList({
  path,
  movies,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFound,
  isShowRequestErrorMessage,
  isPreloader,
  onSaveMovie,
  onDeleteMovie,
  updateSavedMoviesCardList,
}) {
  const windowWidth = SizeScreen();
  const [numberCardsLoaded, setNumberCardsLoaded] = useState(3);
  const [numberCardsDisplayed, setNumberCardsDisplayed] = useState(12);

  useEffect(() => {
    if (windowWidth.width < 1280 && windowWidth.width > 769) {
      setNumberCardsDisplayed(12);
      setNumberCardsLoaded(3);
    }
    if (windowWidth.width <= 769 && windowWidth.width > 480) {
      setNumberCardsDisplayed(8);
      setNumberCardsLoaded(2);
    }
    if (windowWidth.width <= 480) {
      setNumberCardsDisplayed(5);
      setNumberCardsLoaded(2);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (path === "/saved-movies") {
      updateSavedMoviesCardList();
    }
  }, [path]);

  let isMoreCards =
    numberCardsDisplayed < movies.length &&
    numberCardsDisplayed >= 3 &&
    isShowCardList;
  let moviesList;

  if (path === "/saved-movies") {
    isMoreCards = false;
    moviesList = movies.map((movie) => (
      <MoviesCard
        key={movie.id || movie._id}
        path={path}
        isSaved={true}
        movie={movie}
        lang={lang}
        onDeleteMovie={onDeleteMovie}
      />
    ));
  } else {
    moviesList = movies
      .map((movie) => (
        <MoviesCard
          key={movie.id || movie._id}
          path={path}
          movie={movie}
          lang={lang}
          isSaved={
            savedMovies &&
            savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)
          }
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />
      ))
      .slice(0, numberCardsDisplayed);
  }

  const handleButtonMore = () => {
    setNumberCardsDisplayed(numberCardsDisplayed + numberCardsLoaded);
  };

  return (
    <div className="movies-list">
      {isShowNotFound && (
        <p className="movies-list_error">{NotFoundMessage}</p>
      )}
      {isShowRequestErrorMessage && (
        <p className="movies-list_error">{ErrorRequest}</p>
      )}
      {isPreloader && <Preloader />}
      <ul className="movies-list__cards">{isShowCardList && moviesList}</ul>
      {isMoreCards && (
        <button className="movies-list__button" onClick={handleButtonMore}>
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
