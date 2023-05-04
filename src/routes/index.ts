import { Request, Response, Router } from 'express';
import cardsRouter from './cardsRouter';
import usersRouter from './usersRouter';
import { NOT_FOUND_STATUS } from '../constants/constants';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req: Request, res: Response) => {
  res.status(NOT_FOUND_STATUS).send('Страница не найдена');
});

export default router;
