import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { shoppingCart } from './shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../interfaces/product';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<shoppingCart>
  cartcount;
  itemsKey
  products :Product[] =[];
  constructor(
    private shoppingCartService:ShoppingCartService,
    private category:CategoryService
  ) { 

    category.getAllProducts().subscribe(p =>{
      this.products = p;
    })
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(u =>{      
      let count = 0;
        for(let productId in u.item){
            count += u.item[productId].quantity;
        }
      this.cartcount = count;
      if(!u.item) return
      this.itemsKey = Object.keys(u.item);
    })

  }

  totalPrice(){
    let price = 0;
    this.cart$.subscribe(u =>{   
        for(let productId in u.item){
          price += u.item[productId].quantity * u.item[productId].product.price;
        }
    })
    return price;
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }
  
}
