import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', {
      query :{
        orderByChild:'name'
      }
    });
  }

  createProduct(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    return this.db.list('/products');
  }
  getProduct(pId){
    return this.db.object('/products/'+pId);
  }
  update(pId, product){
    return this.db.object('/products/'+pId).update(product);
  }
  delete(pId){
    return this.db.object('/products/'+pId).remove();
  }
}
