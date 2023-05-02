import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const cardSchema = new Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // имя — обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    required: true,
  },
});