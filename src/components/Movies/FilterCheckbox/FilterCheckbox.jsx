import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__checkbox">
        <input className="filter__input" type="checkbox" />
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
