import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from '../utils/types';
import { INVALID_AUTH_DATA } from '../constants/constants';
import {
  USER_ABOUT_DEFAULT,
  USER_AVATAR_DEFAULT,
  USER_NAME_DEFAULT,
} from '../constants/userDataDefault';
import UnauthErr from '../errors/Unautorized';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: USER_NAME_DEFAULT,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: USER_ABOUT_DEFAULT,
    },
    avatar: {
      type: String,
      default: USER_AVATAR_DEFAULT,
    },
  },
  {
    versionKey: false,
  },
);
userSchema.static(
  'updateUserData',
  function updateUserData(userId, userData, options) {
    return this.findByIdAndUpdate(userId, userData, options);
  },
);

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select('+password')
      .then((user: IUser) => {
        if (!user) {
          throw new UnauthErr(INVALID_AUTH_DATA);
        }

        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            throw new UnauthErr(INVALID_AUTH_DATA);
          }
          return user;
        });
      });
  },
);

// создаём модель и экспортируем её
export default mongoose.model<IUser, IUserModel>('user', userSchema);
