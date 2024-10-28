import { IUserEntity, IUserEntityDocument } from '../entity';

export interface IUserRepository {
  createUser(user: IUserEntity): Promise<IUserEntity>;
  findUserById(userId: string): Promise<IUserEntity>;
  findUserByEmail(email: string): Promise<IUserEntity>;
  updateUser(
    userId: string,
    updateUserDto: Partial<IUserEntity>
  ): Promise<IUserEntity>;
  deleteUser(userId: string): Promise<IUserEntity>;
  listUsers(filter: {
    page?: number;
    limit?: number;
    role?: string;
    name?: string;
  }): Promise<IUserEntity[]>;
}
