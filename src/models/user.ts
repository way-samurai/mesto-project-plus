import mongoose, { Schema, Document } from 'mongoose';
import { IUser, IUserModel } from '../utils/types';
import { urlRegex } from '../utils/validation';

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
      },
    },
  },
  { versionKey: false },
);
userSchema.static(
  'updateUserData',
  async function updateUserData(
    userId,
    userData,
    options,
  ) {
    try {
      const updatedUser: Document = await this.findByIdAndUpdate(
        userId,
        userData,
        options,
      );

      if (!updatedUser) {
        throw new Error('Не удалось найти пользователя');
      }

      return updatedUser;
    } catch (error) {
      throw new Error(
        `Произошла ошибка на сервере - ${(error as Error).message}`,
      );
    }
  },
);

// создаём модель и экспортируем её
export default mongoose.model<IUser, IUserModel>('user', userSchema);
