import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
  path,
  onSearch,
  onSearchByDuration,
  searchText,
  moviesFiltered,
  savedMovies,
  lang,
  isShowCardList,
  isShowNotFound,
  isShowRequestErrorMessage,
  isPreloader,
  isSaved,
  onSaveMovie,
  onDeleteMovie,
}) {
  return (
    <>
      <Header path="/movies" isLoggedIn={false} />
      <main>
        <SearchForm
          onSearch={onSearch}
          searchText={searchText}
          onSearchByDuration={onSearchByDuration}
        />
        <MoviesCardList
          isMoreFilms={true}
          path={path}
          movies={moviesFiltered}
          savedMovies={savedMovies}
          lang={lang}
          isShowCardList={isShowCardList}
          isShowNotFound={isShowNotFound}
          isShowRequestErrorMessage={isShowRequestErrorMessage}
          isPreloader={isPreloader}
          isSaved={isSaved}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
