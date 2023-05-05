import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { IUser, IUserModel } from '../utils/types';
import { urlRegex } from '../utils/validation';
import { INVALID_DATA } from '../constants/errors-constants';
import {
  USER_ABOUT_DEFAULT,
  USER_AVATAR_DEFAULT,
  USER_NAME_DEFAULT,
} from '../constants/userDataDefault';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
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
      validate: {
        validator(link: string) {
          return urlRegex.test(link);
        },
        message: INVALID_DATA,
      },
    },
  },
  { versionKey: false },
);
userSchema.static(
  'updateUserData',
  function updateUserData(userId, userData, options) {
    return this.findByIdAndUpdate(userId, userData, options);
  },
);

// создаём модель и экспортируем её
export default mongoose.model<IUser, IUserModel>('user', userSchema);
