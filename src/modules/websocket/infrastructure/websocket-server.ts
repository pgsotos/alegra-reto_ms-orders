import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export default class WebSocketServerGateway {
  @WebSocketServer()
  server: Server;

  sendEventToClient(event: string, data: string): void {
    this.server.emit(event, data);
  }
}
