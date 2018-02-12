import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  form:FormGroup;
  private cart :any
  private user :string
  private cartSubscription:Subscription;
  private userSubscription:Subscription;
  constructor(
    private router:Router,
    private shoppingCartService:ShoppingCartService,
    private OrderService : OrderService,
    private authService: AuthService,
  ) { 

    this.form = new FormGroup({
      first: new FormControl('', Validators.required),
      pnumber: new FormControl('', [Validators.required ]),
      address: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  createObj(){
    let items:any = [] 
    for(let key in this.cart.item){
      let i = this.cart.item[key].product
      items.push({
            product : {
              title: i.title,
              imageURL: i.imageURL,
              price: i.price
            },
            quantity: this.cart.item[key].quantity,
            totalPrice: this.cart.item[key].quantity * i.price
          })      
    }
    return items;

  }
  async placeOrder(){
    let order ={
      userId : this.user,
      datePlace : new Date().getTime(),
      shipping : this.form.value,
      item : this.createObj()
    }
    let result = await this.OrderService.placeOrder(order);
    this.router.navigate(['order-success', result.key])
  }

}
