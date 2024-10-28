import { Types, Document } from 'mongoose';

export interface IUserEntity {
  name: string;
  email: string;
  password: string;
  level: 'admin' | 'user';
}

export interface IUserEntityDocument extends IUserEntity, Document {
  comparePassword: (password: string) => Promise<boolean>;
}
