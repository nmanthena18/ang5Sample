import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  getOrder$:any = []
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    let datePlace = this.route.snapshot.paramMap.get('id');
    this.getOrder$ = this.orderService.getOrdersByDate(datePlace);
  }

}
