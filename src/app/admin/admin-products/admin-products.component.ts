import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../interfaces/product';
import { DataTableResource } from 'angular5-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private product:Product[];
  private filterProducts : Product[];
  subscription:Subscription;
  tableResource :DataTableResource<Product>;
  items : Product[] = [];
  itemCount = 0;
  constructor(
    private categories: CategoryService,

  ) { 
    this.subscription = this.categories.getAllProducts().subscribe(p => {
      this.filterProducts =  this.product = p;
      this.initTable(this.filterProducts);      
    });
    
  }
  private initTable(product:Product[]){
    this.tableResource = new DataTableResource(product);
      this.tableResource.query({offset :0}).then(items => this.items = items);
      this.tableResource.count()
        .then(count => this.itemCount = count);
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
      this.initTable(this.filterProducts);
    }
    reloadItems(params) {
        if (!this.tableResource) return;
        this.tableResource.query(params).then(items => {
          this.items = items
        });
    }

    // special properties:
    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }
}
