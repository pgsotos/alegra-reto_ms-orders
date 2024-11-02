import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import OrderService from '../../application/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('lasts')
  async getRandomOrder() {
    return this.ordersService.getLastsOrders();
  }

  @Get('in-progress')
  async getInProgressOrders() {
    return this.ordersService.getInProgressOrders();
  }

  @Patch(':orderNumber')
  async changeOrderStatus(
    @Param('orderNumber', ParseIntPipe) orderNumber: number
  ) {
    return this.ordersService.changeOrderStatus(orderNumber);
  }

  @Post()
  async createOrder() {
    return this.ordersService.createOrder();
  }
}

export default OrderController;
