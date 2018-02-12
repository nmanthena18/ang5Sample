import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  private orders$ : any;
  constructor(
    private orderService : OrderService,
    private authService:AuthService
  ) { 
    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUserId(u.uid));

  }

  ngOnInit() {
    // this.orderService.getOrders(userId).then(items =>{
    //   console.log(items)
    // })
  }


}
