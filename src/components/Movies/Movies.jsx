import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filmCards } from "../../utils/constants";

function Movies() {
  return (
    <>
      <Header path="/movies" isLoggedIn={false} />
      <main>
        <SearchForm />
        <MoviesCardList filmCards={filmCards} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
