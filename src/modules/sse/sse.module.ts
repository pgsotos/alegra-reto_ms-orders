// modules/sse/sse.module.ts
import { Module } from '@nestjs/common';
import SseController from './infrastructure/sse.controller';
import SseService from './application/sse.service';

@Module({
  controllers: [SseController],
  providers: [SseService],
  exports: [SseService],
})
export default class SseModule {}
