// modules/sse/application/sse.service.ts
import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SseService {
  private createdOrder = new Subject<{ data: any }>();
  private updatedOrder = new Subject<{ data: any }>();

  emitCreatedOrder(order: any): void {
    this.createdOrder.next({ data: order });
  }

  getCreatedOrder(): Observable<{ data: any }> {
    return this.createdOrder.asObservable();
  }

  emitUpdatedOrder(order: any): void {
    this.updatedOrder.next({ data: order });
  }

  getUpdatedOrder(): Observable<{ data: any }> {
    return this.updatedOrder.asObservable();
  }
}

export default SseService;
