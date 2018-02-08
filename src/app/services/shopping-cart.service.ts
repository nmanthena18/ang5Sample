import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../interfaces/product';
import "rxjs/add/operator/take";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db : AngularFireDatabase,
  ) { 
    
  }
  private create(){
    return this.db.list('/shopping-cart/').push({
      dateCreated: new Date().getTime()
    })
  }
  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cartId);
  }

  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-cart/'+cartId+'/item/'+productId)
  }

  async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async updateCart(product:Product, number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item =>{
      item$.update({product:product, quantity : (item.quantity || 0)+ number});
    })
  }
  addToCart(p){
    this.updateCart(p, 1);
  }
  removeFromCart(p){
    this.updateCart(p, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/'+cartId+'/item/').remove();
  }


}
