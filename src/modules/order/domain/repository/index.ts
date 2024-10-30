import { IOrderEntity } from '../entity';

export interface IOrderRepository {
  getLastsOrders(): Promise<IOrderEntity[]>;
  generateOrder(recipe: string): Promise<IOrderEntity>;
  changeOrderStatus(orderNumber: number): Promise<IOrderEntity>;
  getAllOrders(): Promise<IOrderEntity[]>;
}

export default IOrderRepository;
