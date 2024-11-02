import { Module } from '@nestjs/common';
import WebSocketServerGateway from './infrastructure/websocket-server';
import WebSocketService from './application/websocket.service';

@Module({
  providers: [WebSocketServerGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}

export default WebSocketModule;
