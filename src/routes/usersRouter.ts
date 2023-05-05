import { Router } from 'express';
import {
  createUsers, getUserById, getUsers, login, patchUserAvatar, patchUserData,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/sigin', login);
usersRouter.post('/signup', createUsers);
usersRouter.patch('/me', patchUserData);
usersRouter.patch('/me/avatar', patchUserAvatar);

export default usersRouter;
