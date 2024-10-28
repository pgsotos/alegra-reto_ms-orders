import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserRepository } from '../../domain/repository';
import { User } from '../model';
import { IUserEntity } from '../../domain/entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<IUserEntity>
  ) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    return this.UserModel.create(user);
  }

  async findUserById(userId: string): Promise<IUserEntity | null> {
    return this.UserModel.findById(userId);
  }

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return this.UserModel.findOne({ email });
  }

  async updateUser(
    userId: string,
    updateUserDto: Partial<IUserEntity>
  ): Promise<IUserEntity | null> {
    return this.UserModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteUser(userId: string): Promise<IUserEntity | null> {
    return this.UserModel.findByIdAndDelete(userId).exec();
  }

  async listUsers(filter: {
    page?: number;
    limit?: number;
    role?: string;
    name?: string;
  }): Promise<IUserEntity[]> {
    const { page = 1, limit = 10, role, name } = filter;
    const query: { [key: string]: unknown } = {};
    if (role) query.level = role;
    if (name) query.name = new RegExp(name, 'i');

    return this.UserModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}

export default UserRepository;
