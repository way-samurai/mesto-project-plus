const SUCCESS_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const BAD_REQUEST_STATUS = 400;
const UNAUTORIZED = 401;
const SERVER_ERROR_STATUS = 500;
const FORBIDDEN_STATUS = 403;

const SERVER_ERROR_MESSAGE = 'Произошла ошибка на сервере';
const NOT_FOUND_USER_MESSAGE = 'Пользователь не найден';
const NOT_FOUND_USERS_MESSAGE = 'Пользователи не найдены';
const NOT_FOUND_CARD_MESSAGE = 'Карточкa не найденa';
const NOT_FOUND_CARDS_MESSAGE = 'Карточки не найдены';
const INVALID_DATA = 'Переданы невалидные данные';
const INVALID_AUTH_DATA = 'Неправильные почта или пароль';
const NEED_AUTH = 'Необходима авторизация';
const FORBIDDEN_MESSAGE = 'Вы не являетесь владельцем карточки';

const DELETE_CARD_SUCCES = 'Карточка успешно удалена';

export {
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
};
