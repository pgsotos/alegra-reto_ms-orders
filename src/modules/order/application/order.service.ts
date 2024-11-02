import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repository';
import RecipeService from '../infrastructure/service/recipeService';
import WebSocketService from '../../websocket/application/websocket.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly webSocketService: WebSocketService
  ) {}

  async getOrders() {
    return this.orderRepository.getAllOrders();
  }

  async getLastsOrders() {
    return this.orderRepository.getLastsOrders();
  }

  async getInProgressOrders() {
    return this.orderRepository.getInProgressOrders();
  }

  async changeOrderStatus(orderNumber: number) {
    return this.orderRepository.changeOrderStatus(orderNumber);
  }

  async createOrder() {
    const recipe = await RecipeService.getRandomRecipe();
    const order = await this.orderRepository.generateOrder(recipe.name);
    this.webSocketService.sendOrderToClient(order);
  }
}

export default OrderService;
