import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {
  private product:Product[] = [];
  category$:any = [];
  filterProducts:Product[] = [];
  private categoryParam:string;
  cart:any = {};
  private subscrition:Subscription
  constructor(
    private category:CategoryService,
    private route:ActivatedRoute,
    private cartService:ShoppingCartService
  ) {
     category.getAllProducts().switchMap(
      p => {
        this.product =p;
        return route.queryParamMap;
      }).subscribe(params =>{
        this.categoryParam = params.get('category');

        this.filterProducts = (this.categoryParam) ? 
        this.product.filter(p => p.category === this.categoryParam ) : this.product;
      })
     category.getCategories().subscribe(c => this.category$ = c);
     
   }

   addToCart(p:Product){
      this.cartService.addToCart(p);
   }

   getQunatity(){
      this.cartService.getCart().then(
        d => this.subscrition = d.subscribe(item => {this.cart = item.item})
      )
   }

 
   
   ngOnInit(){
    this.getQunatity();    
   }
   ngOnDestroy(){
    this.subscrition.unsubscribe();
   }

}
