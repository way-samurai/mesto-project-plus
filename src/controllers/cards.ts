import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { IAppRequest } from '../utils/types';
import {
  CREATED_STATUS,
  NOT_FOUND_CARDS_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_STATUS,
} from '../constants/constants';
import { ServerErr } from '../errors';

export const getCards = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    if (!cards.length) {
      throw new ServerErr(NOT_FOUND_CARDS_MESSAGE);
    }
    res.status(SUCCESS_STATUS).json({ data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = (req as IAppRequest).user!._id;

  try {
    const card = await Card.create({
      name,
      link,
      owner,
    });

    await card.populate('owner');

    res.status(CREATED_STATUS).json(card);
  } catch (error) {
    const customError = new ServerErr(SERVER_ERROR_MESSAGE);
    next(customError);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId).populate([
      'owner',
      'likes',
    ]);
    if (!card) {
      throw new ServerErr(SERVER_ERROR_MESSAGE);
    }

    res.status(SUCCESS_STATUS).json({ data: card });
  } catch (error) {
    next(error);
  }
};

export const likeCardHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!updatedCard) {
      throw new ServerErr(SERVER_ERROR_MESSAGE);
    }

    res.status(SUCCESS_STATUS).json({ data: updatedCard });
  } catch (error) {
    next(error);
  }
};

export const deleteLikeCardHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!updatedCard) {
      throw new ServerErr(SERVER_ERROR_MESSAGE);
    }

    res.status(SUCCESS_STATUS).json({ data: updatedCard });
  } catch (error) {
    next(error);
  }
};
