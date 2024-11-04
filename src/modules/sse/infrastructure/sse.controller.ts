// modules/sse/infrastructure/sse.controller.ts
import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import SseService from '../application/sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse('createdOrder')
  sendCreatedOrder(): Observable<{ data: any }> {
    return this.sseService.getCreatedOrder();
  }

  @Sse('updatedOrder')
  sendUpdatedOrder(): Observable<{ data: any }> {
    return this.sseService.getUpdatedOrder();
  }
}

export default SseController;
