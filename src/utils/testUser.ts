import { NextFunction, Request, Response } from 'express';
import { IAppRequest } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IAppRequest).user = {
    _id: '6452882d0d0132e0784ee186',
  };
  next();
};
