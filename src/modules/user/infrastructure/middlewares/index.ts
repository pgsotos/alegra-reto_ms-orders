import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../application/user.service';
import { IUserEntityDocument } from '../../domain/entity';
import {
  generateAndRegisterTokens,
  removeCookies,
} from '../../../../common/util';
import { AppConfigService } from '../../../../config/app-config.service'; // Importa AppConfig

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!this.appConfig.isProd) {
        // Utiliza appConfig
        const user = (await this.userService.findUserByEmail(
          'admin@inforser.cl'
        )) as IUserEntityDocument;
        res.locals.userId = user._id;
        res.locals.level = user.level;
        return next();
      }

      const token = req.cookies[`${this.appConfig.token.nameToken}`];
      const level = req.cookies[`${this.appConfig.token.nameLevel}`];
      if (!token)
        throw new UnauthorizedException(
          'Debe estar identificado para poder realizar esta acción.'
        );
      const decodedToken = this.jwtService.verify<{
        userId: string;
        remember: boolean;
      }>(token.replace('Bearer ', ''), { secret: this.appConfig.token.secret });
      const { userId, remember } = decodedToken;

      const user = (await this.userService.findUserById(
        userId
      )) as IUserEntityDocument;
      if (!user || !level)
        throw new UnauthorizedException('Usuario no válido.');
      await generateAndRegisterTokens(user, remember, res, this.appConfig);
      res.locals.userId = userId;
      res.locals.level = level;
      return next();
    } catch (e) {
      console.error(e);
      removeCookies(res, this.appConfig);
      throw new UnauthorizedException('Debe identificarse antes de seguir.');
    }
  }
}

export const isLevel = (level: string) => {
  return (_, res: Response, next: NextFunction) => {
    try {
      if (!res.locals.appConfig.isProd) return next();
      if (res.locals.level === level) return next();
      throw new UnauthorizedException('Necesita permisos');
    } catch (e) {
      return res
        .status(401)
        .json({ message: e.message || 'Debe identificarse antes de seguir.' });
    }
  };
};
