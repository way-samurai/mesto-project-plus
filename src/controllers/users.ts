import { NextFunction, Request, Response } from 'express';
import UnauthErr from 'errors/Unautorized';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { IAppRequest } from '../utils/types';
import {
  CREATED_STATUS,
  INVALID_AUTH_DATA,
  INVALID_DATA,
  NOT_FOUND_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  SUCCESS_STATUS,
} from '../constants/errors-constants';
import { BadRequestErr, NotFoundErr, ServerErr } from '../errors';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  await User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id }, 'dev-super-secret', { expiresIn: '7d' });

      if (!user) {
        throw new NotFoundErr(INVALID_AUTH_DATA);
      }
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 3600000 * 24,
        })
        .status(SUCCESS_STATUS)
        .send({ token });
    })
    .catch((err) => {
      let customError = err;
      if (err.name === ('ValidationError' || 'CastError')) {
        customError = new UnauthErr(INVALID_AUTH_DATA);
      }
      next(customError);
    });
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  await User.find({})
    .then((users) => {
      if (!users.length) {
        throw new ServerErr(NOT_FOUND_USERS_MESSAGE);
      }
      res.status(SUCCESS_STATUS).json({ data: users });
    })
    .catch(next);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.userId;
  await User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(NOT_FOUND_USER_MESSAGE);
      }
      res.status(SUCCESS_STATUS).json({ data: user });
    })
    .catch((err) => {
      let customError = err;
      if (err.name === 'CastError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      next(customError);
    });
};

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = (req as IAppRequest).user!._id;
  await User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(NOT_FOUND_USER_MESSAGE);
      }
      res.status(SUCCESS_STATUS).json({ data: user });
    })
    .catch((err) => {
      let customError = err;
      if (err.name === 'CastError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      next(customError);
    });
};

export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  await User.create({
    email,
    password,
    name,
    about,
    avatar,
  })
    .then((user) => res.status(CREATED_STATUS).json(user))
    .catch((err) => {
      let customError = err;
      if (err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      next(customError);
    });
};

export const patchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const userId = (req as IAppRequest).user!._id;

  await User.updateUserData(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.status(SUCCESS_STATUS).json({ data: updatedUser });
    })
    .catch((err) => {
      let customError = err;

      if (customError.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      if (customError.name === 'CastError') {
        customError = new NotFoundErr(NOT_FOUND_USER_MESSAGE);
      }
      next(customError);
    });
};

export const patchUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const userId = (req as IAppRequest).user!._id;
  await User.updateUserData(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.status(SUCCESS_STATUS).json({ data: updatedUser });
    })
    .catch((err) => {
      let customError = err;
      if (err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      if (customError.name === 'CastError') {
        customError = new NotFoundErr(NOT_FOUND_USER_MESSAGE);
      }
      next(customError);
    });
};
