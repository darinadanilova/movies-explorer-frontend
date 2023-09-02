/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  path,
  onSearch,
  onSearchByDuration,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFound,
  isShowRequestErrorMessage,
  isSaved,
  onDeleteMovie,
  updateSavedMoviesCardList,
}) {
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const filteredMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSavedMovies(filteredMovies);
  }, [savedMovies, searchText]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <div className="saved-movies">
      <Header path="/saved-movies" isLoggedIn={false} />
      <main>
        <SearchForm
          onSearch={onSearch}
          searchText={searchText}
          onSearchByDuration={onSearchByDuration}
          onSearch={handleSearch}
        />
        <MoviesCardList
          isMoreFilms={false}
          path={path}
          movies={filteredSavedMovies}
          lang={lang}
          isShowCardList={isShowCardList}
          isShowNotFound={isShowNotFound}
          isShowRequestErrorMessage={isShowRequestErrorMessage}
          isSaved={isSaved}
          onDeleteMovie={onDeleteMovie}
          updateSavedMoviesCardList={updateSavedMoviesCardList}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
