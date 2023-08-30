import { URL_BASE, URL_BEATFILM_MOVIES } from "./constants";

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

export const register = (name, email, password) =>
  fetch(`${URL_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));

export const login = (email, password) =>
  fetch(`${URL_BASE}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));

export const signout = () =>
  fetch(`${URL_BASE}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then((res) => checkResponse(res));

export const getInfo = (token) =>
  fetch(`${URL_BASE}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });

export const patchInfo = (name, email) =>
  fetch(`${URL_BASE}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResponse(res));

export const getSaveMovies = () =>
  fetch(`${URL_BASE}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));

export const postSaveMovie = (movie) =>
  fetch(`${URL_BASE}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${URL_BEATFILM_MOVIES}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${URL_BEATFILM_MOVIES}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then((res) => checkResponse(res));

export const deleteFilm = (movieId) =>
  fetch(`${URL_BASE}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
