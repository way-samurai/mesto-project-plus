import mongoose, { Schema } from 'mongoose';
import { urlRegex } from '../utils/validation';

const cardSchema = new Schema(
  {
    name: {
      // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // имя — это строка
      required: true, // имя — обязательное поле
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(link: string) {
          return urlRegex.test(link);
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её
export default mongoose.model('card', cardSchema);
