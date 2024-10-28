import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from '../../application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  FilterUsersDto,
  AuthLoginDto,
} from '../../application/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    await this.userService.login(authLoginDto, res);

    return res.json({ ok: true });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get()
  async getAllUsers(@Query() filter: FilterUsersDto) {
    return this.userService.findAllUsers(filter);
  }

  @Patch(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserByEmail(email, updateUserDto);
  }

  @Patch(':email/change-password')
  async changePassword(
    @Param('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.userService.changePassword(email, changePasswordDto);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }
}

export default UserController;
