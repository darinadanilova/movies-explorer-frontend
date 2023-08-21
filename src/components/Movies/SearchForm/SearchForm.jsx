import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form" noValidate>
        <input
          className="search__input"
          required
          type="text"
          placeholder="Фильм"
        />
        <button className="search__button" type="submit" />
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
