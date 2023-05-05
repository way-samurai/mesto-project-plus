import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from '../utils/types';
import { urlRegex } from '../utils/validation';
import { INVALID_DATA } from '../constants/constants';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
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
