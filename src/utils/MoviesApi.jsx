import { URL_BEATFILM } from "./constants";

class MoviesApi {
  constructor() {
    this._URL_BEATFILM = URL_BEATFILM;
  }

  getMovies() {
    return fetch(this._URL_BEATFILM).then((res) =>
      res.ok ? res.json() : Promise.reject(res)
    );
  }
}

const moviesApi = new MoviesApi(URL_BEATFILM);

export default moviesApi;
