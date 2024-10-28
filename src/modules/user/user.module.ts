// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './application/user.service';
import { UserController } from './infrastructure/controllers';
import { User, UserSchema } from './infrastructure/model';
import { UserRepository } from './infrastructure/repository';
import { AppConfigModule } from '../../config/app-config.module'; // Importar AppConfigModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AppConfigModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

export default UserModule;
