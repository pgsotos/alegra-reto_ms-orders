import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isProd(): boolean {
    return this.configService.get<boolean>('isProd') as boolean;
  }

  get token() {
    return {
      secret: this.configService.get<string>('token.secret'),
      nameToken: this.configService.get<string>('token.nameToken'),
      nameLevel: this.configService.get<string>('token.nameLevel'),
    };
  }

  get dbUri(): string {
    return this.configService.get<string>('dbUri');
  }

  get port(): number {
    return this.configService.get<number>('port') || 3000;
  }

  get domain(): string {
    return this.configService.get<string>('domain');
  }

  get endpointMsIngredients(): string {
    return this.configService.get<string>('endpointMsIngredients');
  }

  get endpointMsRecipes(): string {
    return this.configService.get<string>('endpointMsRecipes');
  }

  get endpointMsOrders(): string {
    return this.configService.get<string>('endpointMsOrders');
  }
}

export default AppConfigService;
