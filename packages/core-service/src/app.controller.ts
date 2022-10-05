import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDTO } from './payment';


@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get('validate-order/:order_id')
  validateOrder(@Param('order_id') order_id: string) {

    return this.appService.validateOrder(order_id);
  }

  @Post('payment')
  validatePayment(@Body() paymentDTO: PaymentDTO) {
    this.logger.log('Created a new post with values of ' + JSON.stringify(paymentDTO))
    return this.appService.validatePayment(paymentDTO);
  }

  @Get('restaurant-approval/:order_id')
  restaurantApproval(@Param('order_id') order_id: string) {

    return this.appService.restaurantApproval(order_id);
  }

  @Get('assign-agent/:order_id')
  assignAgent(@Param('order_id') order_id: string) {

    return this.appService.assignAgent(order_id);
  }

  
}
