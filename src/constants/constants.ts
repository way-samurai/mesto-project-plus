const SUCCESS_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTORIZED = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const SERVER_ERROR_STATUS = 500;

const SERVER_ERROR_MESSAGE = 'Произошла ошибка на сервере';
const NOT_FOUND_PAGE_MESSAGE = 'Страница не найдена';
const NOT_FOUND_USER_MESSAGE = 'Пользователь не найден';
const NOT_FOUND_USERS_MESSAGE = 'Пользователи не найдены';
const NOT_FOUND_CARD_MESSAGE = 'Карточкa не найденa';
const NOT_FOUND_CARDS_MESSAGE = 'Карточки не найдены';
const INVALID_DATA = 'Переданы невалидные данные';
const INVALID_DATA_EMAIL = 'Передан невалидный email';
const INVALID_DATA_LINK = 'Передана невалидная ссылка';
const INVALID_AUTH_DATA = 'Неправильные почта или пароль';
const NEED_AUTH = 'Необходима авторизация';
const FORBIDDEN_MESSAGE = 'Вы не являетесь владельцем карточки';
const CONFLICT_EMAIL_UP = 'Пользователь с таким email уже зарегестрирован';
const INVALID_TEXT_LENGTH = 'Текст короче 2 символов или длиннее 30';

const DELETE_CARD_SUCCES = 'Карточка успешно удалена';
const AUTH_ACCEPTED = 'Авторизация прошла успешно';

export {
  INVALID_TEXT_LENGTH,
  NOT_FOUND_PAGE_MESSAGE,
  INVALID_DATA_LINK,
  INVALID_DATA_EMAIL,
  CONFLICT_STATUS,
  CONFLICT_EMAIL_UP,
  DELETE_CARD_SUCCES,
  FORBIDDEN_STATUS,
  FORBIDDEN_MESSAGE,
  NEED_AUTH,
  INVALID_AUTH_DATA,
  UNAUTORIZED,
  SUCCESS_STATUS,
  CREATED_STATUS,
  NOT_FOUND_STATUS,
  BAD_REQUEST_STATUS,
  SERVER_ERROR_STATUS,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_USERS_MESSAGE,
  NOT_FOUND_CARDS_MESSAGE,
  INVALID_DATA,
  NOT_FOUND_CARD_MESSAGE,
  AUTH_ACCEPTED,
};
