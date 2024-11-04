import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repository';
import RecipeService from '../infrastructure/service/recipeService';
import IngredientService from '../infrastructure/service/ingredientService';
import SseService from '../../sse/application/sse.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly sseService: SseService
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
    const order = await this.orderRepository.changeOrderStatus(orderNumber);
    this.sseService.emitUpdatedOrder(order);
    return order;
  }

  async createOrder() {
    const recipe = await RecipeService.getRandomRecipe();
    await IngredientService.getIngredientsToRecipe(recipe.ingredients);
    const order = await this.orderRepository.generateOrder(recipe.name);
    this.sseService.emitCreatedOrder(order);
    return order;
  }
}

export default OrderService;
