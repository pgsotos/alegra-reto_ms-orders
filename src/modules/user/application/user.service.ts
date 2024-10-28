import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { Response } from 'express';
import { IUserRepository } from '../domain/repository';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  FilterUsersDto,
  AuthLoginDto,
} from './dto';
import { IUserEntity, IUserEntityDocument } from '../domain/entity';

import { generateAndRegisterTokens } from '../../../common/util';
import AppConfigService from '../../../config/app-config.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    private readonly appConfigService: AppConfigService
  ) {}

  async onModuleInit() {
    const adminEmail = 'admin@inforser.cl';
    const adminExists = await this.userRepository.findUserByEmail(adminEmail);

    if (!adminExists) {
      const adminUser: CreateUserDto = {
        name: 'Admin',
        email: adminEmail,
        password: 'inforser123',
        level: 'admin',
      };
      await this.createUser(adminUser);
    }
  }

  async login(authLoginDto: AuthLoginDto, res: Response): Promise<void> {
    const { email, password } = authLoginDto;

    // Buscar usuario por email en el repositorio
    const user = (await this.userRepository.findUserByEmail(
      email
    )) as IUserEntityDocument;
    if (!user)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED
      );

    // Comparar la contraseña ingresada con la almacenada
    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED
      );

    // Generar y registrar cookies con token JWT
    await generateAndRegisterTokens(
      user,
      authLoginDto.remember,
      res,
      this.appConfigService
    );
    return;
  }

  async createUser({
    email,
    level,
    ...createUserDto
  }: CreateUserDto): Promise<IUserEntity> {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const newUser: IUserEntity = {
      ...createUserDto,
      email,
      level: level || 'user',
    };

    return this.userRepository.createUser(newUser);
  }

  async updateUserByEmail(
    email: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<IUserEntity> {
    const user = (await this.findUserByEmail(email)) as IUserEntityDocument;
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const adaptedUpdateUserDto: Partial<IUserEntity> = {
      ...updateUserDto,
    };

    const updatedUser = await this.userRepository.updateUser(
      `${user._id}`,
      adaptedUpdateUserDto
    );
    if (!updatedUser)
      throw new HttpException('Update failed', HttpStatus.NOT_FOUND);

    return updatedUser;
  }

  async deleteUserByEmail(email: string): Promise<void> {
    const user = (await this.findUserByEmail(email)) as IUserEntityDocument;
    await this.userRepository.deleteUser(`${user._id}`);
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user)
      throw new HttpException('User not found by Email', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserById(userId: string): Promise<IUserEntity> {
    const user = await this.userRepository.findUserById(userId);
    if (!user)
      throw new HttpException('User not found by Id', HttpStatus.NOT_FOUND);
    return user;
  }

  async findAllUsers(filter: FilterUsersDto): Promise<IUserEntity[]> {
    return this.userRepository.listUsers(filter);
  }

  async changePassword(
    email: string,
    { currentPassword, newPassword }: ChangePasswordDto
  ): Promise<void> {
    const user = (await this.userRepository.findUserByEmail(
      email
    )) as IUserEntityDocument;
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      throw new HttpException(
        'Incorrect current password',
        HttpStatus.FORBIDDEN
      );

    user.password = newPassword;
    await user.save();
  }
}

export default UserService;
