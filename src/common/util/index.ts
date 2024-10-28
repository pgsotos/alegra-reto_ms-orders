import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { IUserEntityDocument } from '../../modules/user/domain/entity';
import { AppConfigService } from '../../config/app-config.service'; // Importar la clase de configuración

export const generateAndRegisterTokens = async (
  user: IUserEntityDocument,
  remember: boolean,
  res: Response,
  appConfigService: AppConfigService
) => {
  // Crear instancia de JwtService con el secreto de la configuración
  const jwtService = new JwtService({ secret: appConfigService.token.secret });

  // Crear el payload con los datos necesarios
  const payload = { userId: user._id, remember };

  // Firmar el JWT
  const token = jwtService.sign(payload);

  // Registrar cookies con token y nivel de usuario
  res.cookie('Authorization', `Bearer ${token}`, {
    httpOnly: true,
    secure: appConfigService.isProd,
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // Recordar durante 30 días si `remember` es true
  });

  // res.cookie(`${appConfig.token.nameLevel}`, user.level, {
  //   httpOnly: true,
  //   secure: appConfig.isProd,
  //   maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  // });
};

export const removeCookies = (res: Response, appConfig: AppConfigService) => {
  // Eliminar cookies al cerrar sesión
  res.clearCookie('Authorization');
  // res.clearCookie(`${appConfig.token.nameLevel}`);
};
