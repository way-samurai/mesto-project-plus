import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthErr from '../errors/Unautorized';
import { SessionRequest } from '../utils/types';
import { NEED_AUTH } from '../constants/constants';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export const useAuth = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthErr(NEED_AUTH));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UnauthErr(NEED_AUTH));
  }
  req.user = payload;

  return next();
};
