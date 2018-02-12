import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class OrderService {
  private uderId :string;
  constructor(
    private authService : AuthService,
    private db:AngularFireDatabase,
    private shoppingCartService:ShoppingCartService,
  ) { 
  }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.object('/orders');
  }

  getOrdersByUserId(userId){
    return this.db.list('/orders', {
      query:{
        orderByChild:'userId',
        equalTo:userId
      }
    })
  }

  getOrdersByDate(datePlace){
    return this.db.list('/orders', {
      query:{
        orderByChild:'datePlace',
        equalTo:datePlace
      }
    })
  }
  
}
