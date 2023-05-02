import { NextFunction, Request, Response } from 'express';
import { IAppRequest } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IAppRequest).user = {
    _id: '64519da5292bc6a475eb465d',
  };
  next();
};