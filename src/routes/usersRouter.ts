import { Router } from 'express';
import {
  getAuthUser,
  getUserById,
  getUsers,
  patchUserAvatar,
  patchUserData,
} from '../controllers/users';
import {
  userAvatarValidator,
  userIdValidator,
  userProfileValidator,
} from '../utils/validators';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getAuthUser);
usersRouter.get('/:userId', userIdValidator, getUserById);
usersRouter.patch('/me', userProfileValidator, patchUserData);
usersRouter.patch('/me/avatar', userAvatarValidator, patchUserAvatar);

export default usersRouter;
