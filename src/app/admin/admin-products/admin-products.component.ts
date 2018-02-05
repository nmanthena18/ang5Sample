import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private product:Product[];
  private filterProducts : Product[];
  subscription:Subscription;
  constructor(
    private categories: CategoryService,

  ) { 
    this.subscription = this.categories.getAllProducts().subscribe(p => this.filterProducts =  this.product = p);
  }

  ngOnInit() {
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  filter(q:string){
    this.filterProducts = (q) ?
    this.filterProducts.filter(p => p.title.toLowerCase().includes(q.toLowerCase())) : 
    this.filterProducts;
  }

}
