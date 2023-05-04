import { Request, Response } from 'express';
import User from '../models/user';
import { IAppRequest } from '../utils/types';
import {
  CREATED_STATUS,
  NOT_FOUND,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
} from '../constants/constants';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(SUCCESS_STATUS).json({ data: users });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(NOT_FOUND).send('Пользователь не найден');
    }
    res.status(SUCCESS_STATUS).json({ data: user });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({
      name,
      about,
      avatar,
    });
    res.status(CREATED_STATUS).json(user);
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const patchUserData = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  const userId = (req as IAppRequest).user!._id;

  try {
    const updatedUser = await User.updateUserData(userId, { name, about });

    if (!updatedUser) {
      return res
        .status(NOT_FOUND)
        .json({ message: 'Не удалось найти пользователя' });
    }

    res.status(SUCCESS_STATUS).json({ data: updatedUser });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const patchUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const userId = (req as IAppRequest).user!._id;

  try {
    const updatedAvatar = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedAvatar) {
      return res
        .status(NOT_FOUND)
        .json({ message: 'Не удалось найти пользователя' });
    }

    res.status(SUCCESS_STATUS).json({ data: updatedAvatar });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};
