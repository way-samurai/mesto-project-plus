import { createUsers, getUserById, getUsers, patchUserAvatar, patchUserData } from '../controllers/users';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUsers);
usersRouter.patch('/me', patchUserData);
usersRouter.patch('/me/avatar', patchUserAvatar);


export default usersRouter;