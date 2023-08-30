import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  path,
  onSearch,
  onSearchByDuration,
  searchText,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFound,
  isShowRequestErrorMessage,
  isSaved,
  onDeleteMovie,
  updateSavedMoviesCardList,
}) {
  return (
    <div className="saved-movies">
      <Header path="/saved-movies" isLoggedIn={false} />
      <main>
        <SearchForm
          onSearch={onSearch}
          searchText={searchText}
          onSearchByDuration={onSearchByDuration}
        />
        <MoviesCardList
          isMoreFilms={false}
          path={path}
          movies={savedMovies}
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
