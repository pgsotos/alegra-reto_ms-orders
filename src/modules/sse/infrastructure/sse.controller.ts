// modules/sse/infrastructure/sse.controller.ts
import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import SseService from '../application/sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse('events')
  sendEvents(): Observable<{ data: any }> {
    return this.sseService.getOrdersUpdates();
  }
}

export default SseController;
