import { Router } from 'express';
import {
  getUserById, getUsers, patchUserAvatar, patchUserData,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', patchUserData);
usersRouter.patch('/me/avatar', patchUserAvatar);

export default usersRouter;
