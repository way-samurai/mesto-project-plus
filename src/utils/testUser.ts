import { NextFunction, Request, Response } from 'express';
import { IAppRequest } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IAppRequest).user = {
    _id: '645524457561b3b0ad4a5884',
  };
  next();
};
