import mongoose, { Schema, Document } from 'mongoose';
import { IUser, IUserModel } from 'utils/types';

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
    },
  },
  { versionKey: false },
);
userSchema.static(
  'updateUserData',
  async function updateUserData(
    userId: string,
    userData: Record<string, IUser>,
  ) {
    try {
      const updatedUser: Document = await this.findByIdAndUpdate(
        userId,
        userData,
        {
          new: true,
          runValidators: true,
        },
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
