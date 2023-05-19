import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import { BadRequestErr } from '../errors';
import { INVALID_DATA_EMAIL, INVALID_DATA_LINK } from '../constants/constants';

// Проверка email на валидность
const emailValidator = (email: string) => {
  if (!validator.isEmail(email)) {
    throw new BadRequestErr(INVALID_DATA_EMAIL);
  }
  return email;
};

// Проверка ссыллок на валидность
const urlValidator = (url: string) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new BadRequestErr(INVALID_DATA_LINK);
  }
  return url;
};

// Проверка данных пользователя при регистрации
export const signUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().custom(emailValidator),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator),
  }),
});

// Проверка данных пользователя при авторизации
export const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// Проверка данных карточки при ее создании
export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(urlValidator),
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator).required(),
  }),
});

export const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
