/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { LoggedContext } from "../../contexts/LoggedContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as MainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import {
  ErrorNotFound,
  InvalidRequest,
  ErrorAuth,
  ErrorConflict,
  ErrorDefault,
  SuccesMessage,
} from "../../utils/constants";
import FilterCheckboxDuration from "..//Movies/FilterCheckbox/FilterCheckboxDuration";
import FilterCheckboxLang from "../Movies/FilterCheckbox/FilterCheckboxLang";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isShowRequestErrorMessage, setIsShowRequestErrorMessage] =
    useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isShowNotFound, setIsShowNotFound] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [lang, setLang] = useState("Ru");
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [isShowCardList, setIsShowCardList] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesLang, setSavedMoviesLang] = useState("Ru");
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
  const [isShowSavedMoviesCardList, setIsShowSavedMoviesCardList] =
    useState(true);
  const [savedMoviesSearchText, setSavedMoviesSearchText] = useState("");
  const [isShowNotFoundSavedMovies, setIsShowNotFoundSavedMovies] =
    useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [isShowSavedMoviesRequestError, setIsShowSavedMoviesRequestError] =
    useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCurrentUser();
    if (localStorage.getItem("CheckboxStatus") !== null) {
      if (localStorage.getItem("CheckboxStatus") === "true") {
        setCheckboxStatus(true);
      } else {
        setCheckboxStatus(false);
      }
    }
    if (localStorage.getItem("SearchText")) {
      setSearchText(localStorage.getItem("SearchText"));
    }
    if (localStorage.getItem("FilteredMovies")) {
      setMoviesFiltered(JSON.parse(localStorage.getItem("FilteredMovies")));
      setIsShowCardList(true);
    }
    if (localStorage.getItem("Lang")) {
      setLang(localStorage.getItem("Lang"));
    }
  }, []);

  useEffect(() => {
    if (isLoad) {
      searchFilms(searchText, checkboxStatus);
      setIsLoad(false);
    }
  }, [isLoad]);

  useEffect(() => {
    if (
      loggedIn &&
      (window.location.pathname === "/signin" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/movies");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem("SavedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const handleSignIn = (email, password) => {
    MainApi.login(email, password)
      .then((data) => {
        if (data !== undefined && data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          getCurrentUser();
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleSignUp = (name, email, password) => {
    MainApi.register(name, email, password)
      .then((data) => {
        if (data !== undefined) {
          handleSignIn(data.email, password);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const getCurrentUser = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        MainApi.getInfo(jwt)
          .then((res) => {
            setCurrentUser(res.data);
            setLoggedIn(true);
            getSaveFilms();
            navigate(`${location.pathname}${location.search}`, {
              replace: true,
            });
          })
          .catch((err) => {
            handleError(err);
          });
      }
    }
  };

  const patchInfoUser = (email, name) => {
    MainApi.patchInfo(name, email)
      .then((res) => {
        setCurrentUser(res.data);
        openTooltip(SuccesMessage);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const getFilms = () => {
    if (loggedIn) {
      setIsPreloader(true);
      setIsShowRequestErrorMessage(false);
      moviesApi
        .getMovies()
        .then((allMovies) => {
          if (allMovies.length > 0) {
            setAllMovies(allMovies);
            setIsPreloader(false);
            setIsMoviesLoaded(true);
            setIsLoad(true);
            localStorage.setItem(
              "MoviesFromBeatfilm",
              JSON.stringify(allMovies)
            );
          }
        })
        .catch((err) => {
          setIsPreloader(false);
          setIsShowRequestErrorMessage(true);
        });
    }
  };

  const getSaveFilms = () => {
    MainApi.getSaveMovies()
      .then((savedMovies) => {
        if (savedMovies.length > 0) {
          setSavedMovies(savedMovies);
          setSavedMoviesFiltered(savedMovies);
          localStorage.setItem("SavedMovies", JSON.stringify(savedMovies));
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const saveFilm = (movie) => {
    MainApi.postSaveMovie(movie)
      .then((res) => {
        if (res.data) {
          setSavedMoviesFiltered([res.data, ...savedMovies]);
          setSavedMovies([res.data, ...savedMovies]);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const deleteFilms = (movie, isInSavedMovies) => {
    const deleteMovie = isInSavedMovies
      ? movie
      : savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    MainApi.deleteFilm(deleteMovie._id)
      .then(() => {
        setSavedMoviesFiltered(
          savedMovies.filter((item) => item._id !== deleteMovie._id)
        );
        setSavedMovies(
          savedMovies.filter((item) => item._id !== deleteMovie._id)
        );
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const updateSaveFilms = () => {
    setIsShowNotFoundSavedMovies(false);
    setSavedMoviesFiltered(savedMovies);
  };

  const handleSearchFilms = (searchText, checkboxStatus) => {
    setSearchText(searchText);
    setCheckboxStatus(checkboxStatus);
    if (isMoviesLoaded === false) {
      getFilms();
    } else {
      searchFilms(searchText, checkboxStatus);
    }
  };

  const searchFilms = (searchText, checkboxStatus) => {
    setIsShowNotFound(false);
    if (checkboxStatus) {
      const { moviesFilteredBySearchText, lang } = FilterCheckboxLang(
        allMovies,
        searchText
      );
      setLang(lang);
      setCheckboxStatus(true);
      const moviesFilteredByDuration = FilterCheckboxDuration(
        moviesFilteredBySearchText
      );
      if (moviesFilteredByDuration.length > 0) {
        setMoviesFiltered(moviesFilteredByDuration);
        setIsShowCardList(true);
        localStorage.setItem(
          "FilteredMovies",
          JSON.stringify(moviesFilteredByDuration)
        );
        localStorage.setItem("SearchText", searchText);
        localStorage.setItem("Lang", lang);
      } else {
        setIsShowNotFound(true);
      }
    } else {
      const { moviesFilteredBySearchText, lang } = FilterCheckboxLang(
        allMovies,
        searchText
      );
      if (moviesFilteredBySearchText.length > 0) {
        setLang(lang);
        setMoviesFiltered(moviesFilteredBySearchText);
        setIsShowCardList(true);
        localStorage.setItem(
          "FilteredMovies",
          JSON.stringify(moviesFilteredBySearchText)
        );
        localStorage.setItem("SearchText", searchText);
        localStorage.setItem("Lang", lang);
      } else {
        setIsShowNotFound(true);
      }
    }
  };

  const searchSaveFilms = (searchText, checkboxStatus) => {
    setIsShowNotFoundSavedMovies(false);
    setSavedMoviesSearchText(searchText);
    if (checkboxStatus) {
      const { moviesFilteredBySearchText, lang } = FilterCheckboxLang(
        savedMovies,
        searchText
      );
      setSavedMoviesLang(lang);
      const moviesFilteredByDuration = FilterCheckboxDuration(
        moviesFilteredBySearchText
      );
      if (moviesFilteredByDuration.length > 0) {
        setSavedMoviesFiltered(moviesFilteredByDuration);
        setIsShowSavedMoviesCardList(true);
      } else {
        setIsShowNotFoundSavedMovies(true);
      }
    } else {
      const { moviesFilteredBySearchText, lang } = FilterCheckboxLang(
        savedMovies,
        searchText
      );
      if (moviesFilteredBySearchText.length > 0) {
        setSavedMoviesLang(lang);
        setSavedMoviesFiltered(moviesFilteredBySearchText);
        setIsShowSavedMoviesCardList(true);
      } else {
        setIsShowNotFoundSavedMovies(true);
      }
    }
  };

  const handleSearchDuration = (checkboxStatus) => {
    const searchText = localStorage.getItem("SearchText");
    if (searchText) {
      handleSearchFilms(searchText, checkboxStatus);
    }
  };

  const handleSearchSaveFilmsDuration = (checkboxStatus) => {
    const searchText = savedMoviesSearchText;
    searchSaveFilms(searchText, checkboxStatus);
  };

  const handleSignout = () => {
    resetState();
    clearLocalStorage();
    navigate("/");
  };

  const resetState = () => {
    setAllMovies([]);
    setSearchText("");
    setMoviesFiltered([]);
    setSavedMovies([]);
    setSavedMoviesFiltered([]);
    setIsMoviesLoaded(false);
    setIsShowNotFound(false);
    setIsShowNotFoundSavedMovies(false);
    setIsShowRequestErrorMessage(false);
    setIsShowSavedMoviesRequestError(false);
    setCurrentUser({});
    setLoggedIn(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("MoviesFromBeatfilm");
    localStorage.removeItem("SavedMovies");
    localStorage.removeItem("FilteredMovies");
    localStorage.removeItem("SearchText");
    localStorage.removeItem("CheckboxStatus");
    localStorage.removeItem("Lang");
  };

  const openTooltip = (message) => {
    setInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  };

  const closeTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const handleError = (err) => {
    switch (err.status) {
      case 400:
        openTooltip(InvalidRequest);
        break;
      case 401 || 403:
        openTooltip(ErrorAuth);
        break;
      case 404:
        openTooltip(ErrorNotFound);
        break;
      case 409:
        openTooltip(ErrorConflict);
        break;
      default:
        openTooltip(
          `${ErrorDefault} ${err.status !== undefined ? err.status : ""}`
        );
        break;
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedContext.Provider value={loggedIn}>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route
              path="/signin"
              element={<Login onLogin={handleSignIn} />}
            ></Route>
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleSignUp}
                  isShowErrorMessage={isShowErrorMessage}
                />
              }
            ></Route>

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  path="/movies"
                  loggedIn={loggedIn}
                  allMovies={allMovies}
                  onSearch={handleSearchFilms}
                  onSearchByDuration={handleSearchDuration}
                  checkboxStatus={checkboxStatus}
                  searchText={searchText}
                  moviesFiltered={moviesFiltered}
                  savedMovies={savedMovies}
                  lang={lang}
                  isShowCardList={isShowCardList}
                  isShowNotFound={isShowNotFound}
                  isShowRequestErrorMessage={isShowRequestErrorMessage}
                  isPreloader={isPreloader}
                  isSaved={isSaved}
                  onSaveMovie={saveFilm}
                  onDeleteMovie={deleteFilms}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  path="/saved-movies"
                  loggedIn={loggedIn}
                  onSearch={searchSaveFilms}
                  onSearchByDuration={handleSearchSaveFilmsDuration}
                  searchText={""}
                  savedMoviesSearchText={savedMoviesSearchText}
                  savedMovies={savedMoviesFiltered}
                  lang={savedMoviesLang}
                  isShowCardList={isShowSavedMoviesCardList}
                  isShowNotFound={isShowNotFoundSavedMovies}
                  isPreloader={isPreloader}
                  isShowRequestErrorMessage={isShowSavedMoviesRequestError}
                  isSaved={true}
                  onDeleteMovie={deleteFilms}
                  updateSavedMoviesCardList={updateSaveFilms}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  editCurrentUser={patchInfoUser}
                  handleLogout={handleSignout}
                  isShowErrorMessage={isShowErrorMessage}
                  setIsShowErrorMessage={setIsShowErrorMessage}
                />
              }
            />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

          <InfoTooltip
            onConfirm={closeTooltip}
            isOpen={isInfoTooltipOpen}
            infoTooltipMessage={infoTooltipMessage}
          />
        </LoggedContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
