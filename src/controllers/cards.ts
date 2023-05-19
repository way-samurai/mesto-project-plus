import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { IAppRequest } from '../utils/types';
import {
  CREATED_STATUS,
  DELETE_CARD_SUCCES,
  FORBIDDEN_MESSAGE,
  INVALID_DATA,
  NOT_FOUND_CARD_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_STATUS,
} from '../constants/constants';
import { BadRequestErr, NotFoundErr, ForbiddenErr } from '../errors';

export const getCards = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  await Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(SUCCESS_STATUS).json({ data: cards });
    })
    .catch(next);
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = (req as IAppRequest).user!._id;

  await Card.create({
    name,
    link,
    owner,
  })
    .then(async (card) => {
      await card.populate('owner');
      res.status(CREATED_STATUS).json(card);
    })
    .catch((err) => {
      let customError = err;
      if (customError instanceof Error && err.name === 'ValidationError') {
        customError = new BadRequestErr(INVALID_DATA);
      }
      next(customError);
    });
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;

  await Card.findById(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      const ownerId = String(card!.owner);
      if (!card) {
        throw new NotFoundErr(SERVER_ERROR_MESSAGE);
      }
      if (userId !== ownerId) {
        throw new ForbiddenErr(FORBIDDEN_MESSAGE);
      }
      return card.remove();
    })
    .then(() => {
      res.status(SUCCESS_STATUS).json({ message: DELETE_CARD_SUCCES });
    })
    .catch((err) => {
      let customError = err;
      if (customError instanceof Error && err.name === 'CastError') {
        customError = new BadRequestErr(NOT_FOUND_CARD_MESSAGE);
      }
      next(customError);
    });
};

export const likeCardHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundErr(NOT_FOUND_CARD_MESSAGE);
      }
      res.status(SUCCESS_STATUS).json({ data: updatedCard });
    })
    .catch((err) => {
      let customError = err;
      if (customError instanceof Error && err.name === 'CastError') {
        customError = new BadRequestErr(NOT_FOUND_CARD_MESSAGE);
      }
      next(customError);
    });
};

export const deleteLikeCardHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = (req as IAppRequest).user!._id;
  await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundErr(NOT_FOUND_CARD_MESSAGE);
      }
      res.status(SUCCESS_STATUS).json({ data: updatedCard });
    })
    .catch((err) => {
      let customError = err;
      if (customError instanceof Error && err.name === 'CastError') {
        customError = new BadRequestErr(NOT_FOUND_CARD_MESSAGE);
      }
      next(customError);
    });
};
