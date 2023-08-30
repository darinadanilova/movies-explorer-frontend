import { CyrillicReg } from "../../../utils/constants";

const FilterCheckboxLang = (movies, searchText) => {
  const reworkedSearchText = searchText.toLowerCase().trim();
  const cyrillic = CyrillicReg;
  let filteredMovies;
  let lang;
  if (cyrillic.test(reworkedSearchText)) {
    lang = "Ru";
    filteredMovies = movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase().trim();
      return nameRu.includes(reworkedSearchText);
    });
  } else {
    lang = "En";
    filteredMovies = movies.filter((movie) => {
      const nameEn = movie.nameEN.toLowerCase().trim();
      return nameEn.includes(reworkedSearchText);
    });
  }
  return { moviesFilteredBySearchText: filteredMovies, lang };
};

export default FilterCheckboxLang;
