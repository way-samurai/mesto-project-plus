import { NextFunction, Request, Response } from 'express';
import { SERVER_ERROR_MESSAGE } from '../constants/constants';
import { ICustomError } from '../utils/types';

export default function errorHandler(
  err: ICustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { statusCode = 500, message = SERVER_ERROR_MESSAGE } = err;
  res.status(statusCode).send({ message });
  return next();
}
