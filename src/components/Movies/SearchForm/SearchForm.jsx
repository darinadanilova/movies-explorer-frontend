import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({ onSearch, searchText, onSearchByDuration }) {
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem("CheckboxStatus") === "true") {
      setCheckboxStatus(true);
    } else {
      setCheckboxStatus(false);
    }
  }, [location]);

  const [textWarning, setTextWarning] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.querySelector("input").value === "") {
      setTextWarning("Нужно ввести ключевое слово");
    } else {
      setTextWarning("");
      onSearch(event.target.querySelector("input").value, checkboxStatus);
      localStorage.setItem("CheckboxStatus", checkboxStatus);
    }
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
    onSearchByDuration(!checkboxStatus);
    localStorage.setItem("CheckboxStatus", !checkboxStatus);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSearch} noValidate>
        <input
          className="search__input"
          required
          name="search"
          type="text"
          placeholder="Фильм"
          defaultValue={searchText}
        />
        <span className="search__error">{textWarning}</span>
        <button className="search__button" type="submit" />
      </form>
      {location.pathname === "/movies" && (
        <div className="filter">
          <label className="filter__checkbox">
            <input
              className="filter__input"
              required
              name="checkbox"
              type="checkbox"
              checked={checkboxStatus}
              onChange={handleCheckboxChange}
            />
            Короткометражки
          </label>
        </div>
      )}
      {location.pathname === "/saved-movies" && (
        <div className="filter">
          <label className="filter__checkbox">
            <input
              className="filter__input"
              required
              name="checkbox"
              type="checkbox"
              checked={checkboxStatus}
              onChange={handleCheckboxChange}
            />
            Короткометражки
          </label>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
