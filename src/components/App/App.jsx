import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />}></Route>

        <Route path="/movies" element={<Movies />}></Route>

        <Route path="/saved-movies" element={<SavedMovies />}></Route>

        <Route path="/profile" element={<Profile />}></Route>

        <Route path="/signin" element={<Login />}></Route>

        <Route path="/signup" element={<Register />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
