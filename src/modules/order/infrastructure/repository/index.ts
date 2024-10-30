import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IOrderEntity, IOrderStatus } from '../../domain/entity';
import { IOrderRepository } from '../../domain/repository';
import RecipeService from '../service/recipeService';
import IngredientService from '../service/ingredientService';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<IOrderEntity>
  ) {}

  getLastsOrders(): Promise<IOrderEntity[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).limit(10);
  }

  changeOrderStatus(orderNumber: number): Promise<IOrderEntity> {
    return this.orderModel.findOneAndUpdate(
      { orderNumber },
      { $set: { status: IOrderStatus.Completed } },
      { new: true }
    );
  }

  getAllOrders(): Promise<IOrderEntity[]> {
    return this.orderModel.find().sort({ createdAt: -1 });
  }

  async generateOrder(recipe: string): Promise<IOrderEntity> {
    console.log(recipe);
    const order = await this.orderModel.create({ recipe });
    console.log(order);
    return order;
  }
}

export default OrderRepository;
