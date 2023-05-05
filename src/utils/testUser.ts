import { NextFunction, Request, Response } from 'express';
import { IAppRequest } from './types';

export const testUserId = (req: Request, res: Response, next: NextFunction) => {
  (req as IAppRequest).user = {
    _id: '64551df1692632d7ebb161cb',
  };
  next();
};
