import { Router } from 'express';
import {
  createCard, deleteCard, deleteLikeCardHandler, getCards, likeCardHandler,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCardHandler);
cardsRouter.delete('/:cardId/likes', deleteLikeCardHandler);

export default cardsRouter;
