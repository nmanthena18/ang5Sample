import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private product$:Product[];
  constructor(
    private category:CategoryService
  ) {
     category.getAllProducts().subscribe(
      p => this.product$ =p
    );
   }

  ngOnInit() {
  }

}
