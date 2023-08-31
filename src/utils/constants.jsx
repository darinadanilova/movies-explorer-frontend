const { PORT = 3000 } = process.env;
const { URL_BASE = "https://api.darinadanilova.nomoreparties.sbs" } =
  process.env;
const { URL_BEATFILM_MOVIES = "https://api.nomoreparties.co" } = process.env;
const { URL_BEATFILM = "https://api.nomoreparties.co/beatfilm-movies" } =
  process.env;
const { SECRET_KEY = "some-secret-key" } = process.env;
const SHORT_FILMS = 40;
const CARDS_LOADED_SMALL = 2;
const CARDS_LOADED_BIG = 3;
const CARDS_DISPLAYED_SMALL = 5;
const CARDS_DISPLAYED_MIDDLE = 8;
const CARDS_DISPLAYED_BIG = 12;
const CyrillicReg = /^[\u0400-\u04FF]+$/;
const NameReg = /([А-ЯЁа-яёa-z-\s]+)/gi;
const EmailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const ErrorNotFound = "Ничего не найдено";
const TryAgain =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
const InvalidRequest = "Невалидный запрос";
const ErrorAuth = "Ошибка авторизации";
const ErrorConflict = "Такой пользователь уже существует";
const ErrorDefault = "Возникла ошибка";
const SuccesMessage = "Вы успешно обновили данные!";
const ErrorEmail = "Введён некорректный email!";
const ErrorPassword = "Пароль не должен быть короче 6 символов!";
const ErrorName =
  "Имя может содержать только кирилицу, латиницу, пробел или дефис!";
const ErrorRegister =
  "Во время регистрации произошла ошибка. Возможно, проблема с соединением или пользователь с таким email уже существует";
const ErrorRequest =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Попробуйте ещё раз позже.";
const NotFoundMessage = "Ничего не найдено.";
const NameError = "Не введено имя пользователя!";
const EmailError = "Не введён адрес электронной почты!";

module.exports = {
  PORT,
  URL_BASE,
  URL_BEATFILM_MOVIES,
  SECRET_KEY,
  CyrillicReg,
  NameReg,
  EmailReg,
  ErrorNotFound,
  TryAgain,
  InvalidRequest,
  ErrorAuth,
  ErrorConflict,
  ErrorDefault,
  SHORT_FILMS,
  SuccesMessage,
  ErrorEmail,
  ErrorPassword,
  ErrorName,
  ErrorRegister,
  ErrorRequest,
  NotFoundMessage,
  NameError,
  EmailError,
  URL_BEATFILM,
  CARDS_LOADED_SMALL,
  CARDS_LOADED_BIG,
  CARDS_DISPLAYED_SMALL,
  CARDS_DISPLAYED_MIDDLE,
  CARDS_DISPLAYED_BIG
};
