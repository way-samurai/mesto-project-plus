import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { IAppRequest } from '../utils/types';
import {
  CREATED_STATUS,
  NOT_FOUND_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_STATUS,
} from '../constants/constants';
import { NotFoundErr, ServerErr } from '../errors';

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      throw new ServerErr(NOT_FOUND_USERS_MESSAGE);
    }
    res.status(SUCCESS_STATUS).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundErr(NOT_FOUND_USER_MESSAGE);
    }
    res.status(SUCCESS_STATUS).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({
      name,
      about,
      avatar,
    });
    res.status(CREATED_STATUS).json(user);
  } catch (error) {
    const customError = new ServerErr(SERVER_ERROR_MESSAGE);
    next(customError);
  }
};

export const patchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const userId = (req as IAppRequest).user!._id;

  try {
    const updatedUser = await User.updateUserData(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundErr(NOT_FOUND_USER_MESSAGE);
    }

    res.status(SUCCESS_STATUS).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const patchUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const userId = (req as IAppRequest).user!._id;

  try {
    const updatedAvatar = await User.updateUserData(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedAvatar) {
      throw new NotFoundErr(NOT_FOUND_USER_MESSAGE);
    }

    res.status(SUCCESS_STATUS).json({ data: updatedAvatar });
  } catch (error) {
    next(error);
  }
};
