import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IOrderEntity, IOrderStatus } from '../../domain/entity';
import { IOrderRepository } from '../../domain/repository';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<IOrderEntity>
  ) {}

  getLastsOrders(): Promise<IOrderEntity[]> {
    return this.orderModel.find().sort({ orderNumber: 1 }).limit(10);
  }

  getAllOrders(): Promise<IOrderEntity[]> {
    return this.orderModel.find().sort({ orderNumber: 1 });
  }

  getInProgressOrders(): Promise<IOrderEntity[]> {
    return this.orderModel
      .find({ status: IOrderStatus.InProgress })
      .sort({ orderNumber: 1 });
  }

  changeOrderStatus(orderNumber: number): Promise<IOrderEntity> {
    return this.orderModel.findOneAndUpdate(
      { orderNumber },
      { $set: { status: IOrderStatus.Completed } },
      { new: true }
    );
  }

  generateOrder(recipe: string): Promise<IOrderEntity> {
    return this.orderModel.create({ recipe });
  }
}

export default OrderRepository;
