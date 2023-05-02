import { createUsers, getUserById, getUsers } from '../controllers/users';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('userId', getUserById);
usersRouter.post('/', createUsers);

export default usersRouter;