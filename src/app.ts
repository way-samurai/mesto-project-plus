import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middlewares/ErrorHandingMiddleware';
import { createUsers, login } from './controllers/users';
import auth from './middlewares/AuthMiddleware';
import { requestLogger, errorLogger } from './middlewares/LoggerMiddlewares';
import requestLimiter from './middlewares/ServerRequestLimiterMiddleware';

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(requestLimiter);
app.use(express.json());
app.use(requestLogger);
app.post('/sigin', login);
app.post('/signup', createUsers);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);

    app.listen(PORT);
    console.log('Сервер запущен', PORT);
  } catch (err) {
    console.error('Ошибка подключения', err);
  }
};

start();
