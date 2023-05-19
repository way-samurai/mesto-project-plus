import mongoose, { Schema } from 'mongoose';
import { INVALID_DATA_LINK } from '../constants/constants';
import { urlRegex } from '../constants/regConst';

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
        message: INVALID_DATA_LINK,
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
