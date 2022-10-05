import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PaymentDTO } from './payment';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  sequelize = new Sequelize(
    {
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     }
    }
);

  performValidation(order: string){
    return true;
  }

  async validateOrder(order_id: string) {
    this.logger.log('order_id value: ' + order_id);
    try {
      interface Order {
        order_id: string;
     }
     var order = {} as Order;
      var isValid = this.performValidation(order_id);
      order.order_id = order_id;
      this.logger.log('order_id value in order: ' + order.order_id);
      return await this.sequelize.query('UPDATE orders SET order_valid = :isValid WHERE order_id = :orderId',
                                         { replacements: { isValid: isValid, orderId: order.order_id } }
                                       );
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	    //this.sequelize.close();
    }
  }


   async validatePayment(paymentReq: PaymentDTO) {
    this.logger.log('Created a new post with values of ' + JSON.stringify(paymentReq))
    //this.logger.log('order_id value: ' + order_id);
    try {
      this.logger.log('Payment details: Order ID = ' + paymentReq.order_id + ' Amount = ' + paymentReq.amount + 'Type = ' + paymentReq.type);
      return await this.sequelize.query('BEGIN;' +
                                    'INSERT INTO payments(order_id, amount, type) values (:orderId, :amount, :type); ' +
                                    'UPDATE orders SET payment_valid=true WHERE order_id = :orderId; ' +
                                    'COMMIT;',
                                        { replacements: { orderId: paymentReq.order_id, amount: paymentReq.amount, type: paymentReq.type } }
                                       );
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	    //this.sequelize.close();
    }
  }

  async restaurantApproval(order_id: string) {
    this.logger.log('order_id value: ' + order_id);
    try {
      interface Order {
        order_id: string;
     }
     return await this.sequelize.query('UPDATE orders SET approved = true WHERE order_id = :orderId',
                                    { replacements: { orderId: order_id } });
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	    //this.sequelize.close();
    }
  }
  drivers = [95, 96, 97, 98, 99, 100];

  getRandomDriver() {
    return this.drivers[Math.floor(Math.random() * 5)];
 }

  async assignAgent(order_id: string) {
    this.logger.log('order_id value: ' + order_id);
    try {
      interface Order {
        order_id: string;
     }
     var driverId = this.getRandomDriver();
     return await this.sequelize.query('BEGIN;' +
     'INSERT INTO assignment (order_id, driver_id) values (:orderId, :driverId); ' +
     'UPDATE orders SET driver_assigned=true WHERE order_id = :orderId ;' +
     'COMMIT;',
     { replacements: { orderId: order_id, driverId: driverId } }
    );
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	    //this.sequelize.close();
    }
  }
}
