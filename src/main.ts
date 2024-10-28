import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import AppConfigService from './config/app-config.service';
import ErrorInterceptor from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, isProd, domain } = app.get(AppConfigService);

  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: domain,
    methods: 'GET,POST,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorInterceptor());

  app.use(morgan(isProd ? 'tiny' : 'dev'));

  await app.listen(port, () => {
    console.log(
      `Server is running on port ${port} in ${isProd ? 'production' : 'development'} mode`
    );
  });
}
bootstrap();
