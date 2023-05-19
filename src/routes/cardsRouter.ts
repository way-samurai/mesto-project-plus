import { Router } from 'express';
import {
  createCard, deleteCard, deleteLikeCardHandler, getCards, likeCardHandler,
} from '../controllers/cards';
import { cardIdValidator, createCardValidator } from '../utils/validators';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidator, likeCardHandler);
cardsRouter.delete('/:cardId/likes', cardIdValidator, deleteLikeCardHandler);

export default cardsRouter;
