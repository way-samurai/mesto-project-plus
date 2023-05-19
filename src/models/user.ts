import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { IUser, IUserModel } from '../utils/types';
import { INVALID_AUTH_DATA, INVALID_DATA_LINK, INVALID_TEXT_LENGTH } from '../constants/constants';
import {
  USER_ABOUT_DEFAULT,
  USER_AVATAR_DEFAULT,
  USER_NAME_DEFAULT,
} from '../constants/userDataDefault';
import UnauthErr from '../errors/Unautorized';
import { urlRegex } from '../constants/regConst';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (valid: string) => validator.isEmail(valid),
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
      validate: {
        validator: (valid: string) => valid.length > 2 && valid.length < 30,
        message: INVALID_TEXT_LENGTH,
      },
    },
    avatar: {
      type: String,
      default: USER_AVATAR_DEFAULT,
      validate: {
        validator(link: string) {
          return urlRegex.test(link);
        },
        message: INVALID_DATA_LINK,
      },
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
