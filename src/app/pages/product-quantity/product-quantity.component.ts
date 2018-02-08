import { Component, OnInit, Input, } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit{
  @Input('product') product:Product
  @Input('shopping-cart') shoppingCart;
  private cartItems
  constructor(
    private cartService:ShoppingCartService
  ) {
    
  }

   addToCart(p:Product){
      this.cartService.addToCart(p);
   }

   removeFromCart(p){
    this.cartService.removeFromCart(p);
   }
   
   getEachItemQuantity(p){
     if(JSON.stringify(this.shoppingCart) == '{}' || JSON.stringify(this.shoppingCart) == undefined) return 0; 
      let P = this.shoppingCart[p.$key];
        if(!P) return 0;
      
        return P.quantity;
        
     //if(p != undefined) return P.quantity;
     //return false
   }

   ngOnInit(){
      //this.getEachItemQuantity(this.product)
   }
}
