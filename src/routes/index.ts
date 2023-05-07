import {
  NextFunction, Request, Response, Router,
} from 'express';
import cardsRouter from './cardsRouter';
import usersRouter from './usersRouter';
import { NotFoundErr } from '../errors';
import { NOT_FOUND_PAGE_MESSAGE } from '../constants/constants';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((_req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundErr(NOT_FOUND_PAGE_MESSAGE));
});

export default router;
