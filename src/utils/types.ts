import { Request } from 'express';
import mongoose from 'mongoose';

export interface IAppRequest extends Request {
  user?: {
    _id: string,
  };
}