import { Request, Response, Router } from 'express';
import cardsRouter from './cardsRouter';
import usersRouter from './usersRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req: Request, res: Response) => {
  res.status(404).send('Страница не найдена');
});

export default router;
