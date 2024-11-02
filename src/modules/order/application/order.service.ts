import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repository';
import RecipeService from '../infrastructure/service/recipeService';
import IngredientService from '../infrastructure/service/ingredientService';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository
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
    console.log(recipe.ingredients);
    const remainingIngredients = await IngredientService.getIngredientsToRecipe(
      recipe.ingredients
    );
    return this.orderRepository.generateOrder(recipe.name);
  }
}

export default OrderService;
