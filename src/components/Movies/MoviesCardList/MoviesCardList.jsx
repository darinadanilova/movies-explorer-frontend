/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { NotFoundMessage, ErrorRequest } from "../../../utils/constants";
import Preloader from "../Preloader/Preloader";
import SizeScreen from "../../SizeScreen/SizeScreen";
import {
  CARDS_LOADED_SMALL,
  CARDS_LOADED_BIG,
  CARDS_DISPLAYED_SMALL,
  CARDS_DISPLAYED_MIDDLE,
  CARDS_DISPLAYED_BIG,
  SCREEN_SIZE_SMALL,
  SCREEN_SIZE_MIDDLE,
  SCREEN_SIZE_BIG
} from "../../../utils/constants";

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
  const [numberCardsLoaded, setNumberCardsLoaded] = useState(CARDS_LOADED_BIG);
  const [numberCardsDisplayed, setNumberCardsDisplayed] =
    useState(CARDS_DISPLAYED_BIG);

  useEffect(() => {
    if (windowWidth.width < SCREEN_SIZE_BIG && windowWidth.width > SCREEN_SIZE_MIDDLE) {
      setNumberCardsDisplayed(CARDS_DISPLAYED_BIG);
      setNumberCardsLoaded(CARDS_LOADED_BIG);
    }
    if (windowWidth.width <= SCREEN_SIZE_MIDDLE && windowWidth.width > SCREEN_SIZE_SMALL) {
      setNumberCardsDisplayed(CARDS_DISPLAYED_MIDDLE);
      setNumberCardsLoaded(CARDS_LOADED_SMALL);
    }
    if (windowWidth.width <= SCREEN_SIZE_SMALL) {
      setNumberCardsDisplayed(CARDS_DISPLAYED_SMALL);
      setNumberCardsLoaded(CARDS_LOADED_SMALL);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (path === "/saved-movies") {
      updateSavedMoviesCardList();
    }
  }, [path]);

  let isMoreCards =
    numberCardsDisplayed < movies.length &&
    numberCardsDisplayed >= CARDS_LOADED_BIG &&
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
      {isShowNotFound && <p className="movies-list_error">{NotFoundMessage}</p>}
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
