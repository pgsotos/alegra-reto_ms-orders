// src/config/app-config.module.ts
import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService], // Exportar el servicio para usarlo en otros módulos
})
export class AppConfigModule {}
export default AppConfigModule;
