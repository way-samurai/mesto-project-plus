import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middleware/ErrorHandingMiddleware';
import { createUsers, login } from './controllers/users';
import auth from './middleware/AuthMiddleware';

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(express.json());
app.post('/sigin', login);
app.post('/signup', createUsers);
app.use(auth);
app.use(router);
app.use(errorHandler);

const start = async () => {
  try {
    // подключаемся к серверу MongoiDB
    await mongoose.connect(DB_URL);

    app.listen(PORT);
    console.log('Сервер запущен', PORT);
  } catch (err) {
    console.error('Ошибка подключения', err);
  }
};

start();
