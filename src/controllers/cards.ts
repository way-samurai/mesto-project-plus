import { Request, Response } from 'express';
import Card from '../models/card';
import { IAppRequest } from '../utils/types';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ data: cards });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Произошла ошибка на сервере',
        error: (error as Error).message,
      });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = (req as IAppRequest).user!._id;

  try {
    if (!name || !link) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }

    const card = await Card.create({
      name,
      link,
      owner,
    });

    res.status(201).json(card);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Произошла ошибка на сервере',
        error: (error as Error).message,
      });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      return res.status(400).json({ message: 'Не удалось найти карточку' });
    }

    res.status(200).json({ data: card });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Произошла ошибка на сервере',
        error: (error as Error).message,
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
      return res.status(404).json({ message: 'Не удалось найти карточку' });
    }

    res.status(200).json({ data: updatedCard });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Произошла ошибка на сервере',
        error: (error as Error).message,
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
      return res.status(404).json({ message: 'Не удалось найти карточку' });
    }

    res.status(200).json({ data: updatedCard });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Произошла ошибка на сервере',
        error: (error as Error).message,
      });
  }
};
