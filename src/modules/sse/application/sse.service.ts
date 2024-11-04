// modules/sse/application/sse.service.ts
import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SseService {
  // Subject para emitir actualizaciones manuales
  private ordersUpdates = new Subject<{ data: any }>();

  // Método para emitir manualmente actualizaciones de ingredientes
  emitOrdersUpdate(orders: any): void {
    this.ordersUpdates.next({ data: orders });
  }

  // Obtener observable para actualizaciones
  getOrdersUpdates(): Observable<{ data: any }> {
    return this.ordersUpdates.asObservable();
  }
}

export default SseService;
