/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { Model, Document } from 'mongoose';

export interface IAppRequest extends Request {
  user?: {
    _id: string;
  };
}

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface IUpdateUserData {
  name?: string;
  about?: string;
  avatar?: string;
}

type TUpdateUserData =
  | {
      name: string;
      about: string;
    }
  | {
      avatar: string;
    };

export interface IUserModel extends Model<IUser> {
  updateUserData: (
    userId: string,
    userData: TUpdateUserData
  ) => Promise<Document<unknown, any, IUser>>;
}

export interface ICustomError extends Error {
  statusCode: number;
}
