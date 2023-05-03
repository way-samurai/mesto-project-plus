import { Request, Response } from 'express';
import Card from '../models/card';
import { IAppRequest } from '../utils/types';
import {
  BAD_REQUEST_STATUS,
  CREATED_STATUS,
  NOT_FOUND,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
} from '../constants/constants';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(SUCCESS_STATUS).json({ data: cards });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = (req as IAppRequest).user!._id;

  try {
    if (!name || !link) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ message: 'Не все поля заполнены' });
    }

    const card = await Card.create({
      name,
      link,
      owner,
    });

    res.status(CREATED_STATUS).json(card);
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ message: 'Не удалось найти карточку' });
    }

    res.status(SUCCESS_STATUS).json({ data: card });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const likeCardHandler = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!updatedCard) {
      return res
        .status(NOT_FOUND)
        .json({ message: 'Не удалось найти карточку' });
    }

    res.status(SUCCESS_STATUS).json({ data: updatedCard });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};

export const deleteLikeCardHandler = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!updatedCard) {
      return res
        .status(NOT_FOUND)
        .json({ message: 'Не удалось найти карточку' });
    }

    res.status(SUCCESS_STATUS).json({ data: updatedCard });
  } catch (error) {
    res.status(SERVER_ERROR_STATUS).json({
      message: `Произошла ошибка на сервере - ${(error as Error).message}`,
    });
  }
};
