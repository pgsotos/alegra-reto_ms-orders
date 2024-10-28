import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import appConfig from './config/app.config';
import { AppConfigModule } from './config/app-config.module'; // Importar AppConfigModule
import IngredientModule from './modules/ingredient/ingredient.module';
import RecipeModule from './modules/recipe/recipe.module';

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // Usar ConfigService para obtener la URI
        onConnectionCreate(connection) {
          connection.on('error', () =>
            console.error(
              `Error to connect DB at URI: ${configService.get<string>('DB_URI')}`
            )
          );
          connection.once('open', () => console.log('Connected to DB'));
        },
      }),
    }),
    AppConfigModule,
    IngredientModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
export default AppModule;
