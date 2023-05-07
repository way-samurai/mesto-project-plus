import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ConflictErr from '../errors/ConflictErr';
import User from '../models/user';
import { IAppRequest } from '../utils/types';
import {
  AUTH_ACCEPTED,
  CONFLICT_EMAIL_UP,
  CREATED_STATUS,
  INVALID_AUTH_DATA,
  INVALID_DATA,
  NOT_FOUND_USER_MESSAGE,
  SUCCESS_STATUS,
} from '../constants/constants';
import { BadRequestErr, NotFoundErr } from '../errors';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign({ _id }, 'super-strong-secret', {
        expiresIn: '7d',
      });

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
        .send({ message: AUTH_ACCEPTED });
    })
    .catch(next);
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  await User.find({})
    .then((users) => {
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
      if (customError instanceof Error && err.name === 'CastError') {
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
    .catch(next);
};

export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(CREATED_STATUS).json(user))
    .catch((err) => {
      let customError = err;
      if (customError instanceof Error && err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      if (
        customError instanceof Error
        && err.name === 'MongoServerError'
        && err.code === 11000
      ) {
        customError = new ConflictErr(CONFLICT_EMAIL_UP);
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

      if (customError instanceof Error && err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
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
      if (customError instanceof Error && err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      next(customError);
    });
};
