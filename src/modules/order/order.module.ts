import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './infrastructure/model';
import { OrderService } from './application/order.service';
import { OrderController } from './infrastructure/controllers';
import { OrderRepository } from './infrastructure/repository';
import WebSocketModule from '../websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    WebSocketModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}

export default OrderModule;
