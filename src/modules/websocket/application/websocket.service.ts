import { Injectable } from '@nestjs/common';
import WebSocketServerGateway from '../infrastructure/websocket-server';
import { IOrderEntity } from '../../order/domain/entity';

@Injectable()
export default class WebSocketService {
  constructor(
    private readonly webSocketServerGateway: WebSocketServerGateway
  ) {}

  sendOrderToClient(order: IOrderEntity): void {
    console.log('sendOrderToClient', order);
    this.webSocketServerGateway.sendEventToClient(
      'newOrder',
      JSON.stringify(order)
    );
  }
}
