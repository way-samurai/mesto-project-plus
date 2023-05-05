import { NextFunction, Request, Response } from 'express';
import { IAppRequest } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IAppRequest).user = {
    _id: '64552e27dc177748e26dc244',
  };
  next();
};
