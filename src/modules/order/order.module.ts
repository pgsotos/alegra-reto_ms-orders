import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './infrastructure/model';
import { OrderService } from './application/order.service';
import { OrderController } from './infrastructure/controllers';
import { OrderRepository } from './infrastructure/repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
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
