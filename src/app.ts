import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/ErrorHandingMiddleware';
import { createUsers, login } from './controllers/users';
import auth from './middlewares/AuthMiddleware';
import { requestLogger, errorLogger } from './middlewares/LoggerMiddlewares';
import requestLimiter from './middlewares/ServerRequestLimiterMiddleware';
import { signInValidator, signUpValidator } from './utils/validators';

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(requestLimiter);
app.use(express.json());
app.use(requestLogger);
app.post('/sigin', signInValidator, login);
app.post('/signup', signUpValidator, createUsers);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
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
