import { Request, Response, Router } from 'express';
import cardsRouter from './cardsRouter';
import usersRouter from './usersRouter';
import { NOT_FOUND } from '../constants/constants';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req: Request, res: Response) => {
  res.status(NOT_FOUND).send('Страница не найдена');
});

export default router;
