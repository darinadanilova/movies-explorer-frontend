import { SHORT_FILMS } from "../../../utils/constants";

const FilterCheckboxDuration = (movies) =>
  movies.filter((movie) => movie.duration < SHORT_FILMS);

export default FilterCheckboxDuration;
