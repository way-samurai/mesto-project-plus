/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model, Document, ObjectId } from 'mongoose';

export interface IAppRequest extends Request {
  user?: {
    _id: string;
  };
}

export interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
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
    userData: TUpdateUserData,
    options: { new: boolean; runValidators: true }
  ) => Promise<Document<unknown, any, IUser>>;
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

export interface ICustomError extends Error {
  statusCode: number;
}
