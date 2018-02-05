import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements  OnDestroy{
  private categories$;
  private product = {};
  private subscription: ISubscription;
  private pId;
  constructor(
    private categories: CategoryService,
    private router:Router,
    private route:ActivatedRoute,
  ) {
    this.categories$ = categories.getCategories();
    this.pId = this.route.snapshot.paramMap.get('id');
    if(this.pId)  this.subscription = this.categories.getProduct(this.pId).subscribe(p => this.product = p);
   }

  ngOnInit() {
  }

  save(p){
    if(this.pId) this.categories.update(this.pId, p);
    else this.categories.createProduct(p);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure to delete this product...?')) return
    this.categories.delete(this.pId);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(){
   //this.subscription.unsubscribe();
  }

}
