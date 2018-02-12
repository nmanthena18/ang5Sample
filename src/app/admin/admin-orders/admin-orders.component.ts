import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  private orders$:Observable<OrderService>;
  private OrderData: any =[];
  constructor(
    private orderService : OrderService
  ) {
    this.orders$ = orderService.getOrders();
   }

  ngOnInit() {
    this.orders$.subscribe(items =>{
      for(let key in items){
        this.OrderData.push(items[key]);
      }
    })
  }

}
