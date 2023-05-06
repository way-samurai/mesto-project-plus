import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const transportReq = new winston.transports.DailyRotateFile({
  // указываем формат имени файла
  filename: 'request-%DATE%.log',
  // указываем шаблон для даты
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
});

const transportErr = new winston.transports.DailyRotateFile({
  // указываем формат имени файла
  filename: 'error-%DATE%.log',
  // указываем шаблон для даты
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
});

const requestLogger = expressWinston.logger({
  transports: [transportReq],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [transportErr],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
