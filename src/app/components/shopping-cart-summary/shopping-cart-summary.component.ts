import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { shoppingCartItems } from '../../interfaces/shopping-cartItems';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {
  private cartSubscription:Subscription;
  private cart:any
  private items:any
  private itemsTotalPrice;
  private itemsTotal:Number
  constructor(
    private shoppingCartService:ShoppingCartService,
  ) { 
    
  }

 async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      this.cart = cart;
      this.items = this.createObj();
    });
  }
  createObj(){
    let items:any = [] 
    this.itemsTotalPrice = 0;
    this.itemsTotal = 0;
    for(let key in this.cart.item){
      let i = this.cart.item[key].product;
      items.push({
            product : {
              title: i.title,
              imageURL: i.imageURL,
              price: i.price
            },
            quantity: this.cart.item[key].quantity,
            totalPrice: this.cart.item[key].quantity * i.price,
          })      
      this.itemsTotal+= this.cart.item[key].quantity;
      this.itemsTotalPrice+= this.cart.item[key].quantity * i.price;
    }
    return items;
  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }
}
