import { NextFunction, Request, Response } from 'express';
import { SERVER_ERROR_MESSAGE } from '../constants/constants';
import { ICustomError } from '../utils/types';

export default function errorHandler(
  err: ICustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? SERVER_ERROR_MESSAGE : message,
  });
  next();
}
