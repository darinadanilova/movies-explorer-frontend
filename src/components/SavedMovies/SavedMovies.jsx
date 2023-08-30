import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { savedFilms } from "../../utils/constants";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header path="/saved-movies" isLoggedIn={false} />
      <main>
        <SearchForm />
        <MoviesCardList
          savedFilms={savedFilms}
          isSavedFilms={true}
          isMoreFilms={false}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
