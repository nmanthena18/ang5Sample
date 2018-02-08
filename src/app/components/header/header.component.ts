import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import 'rxjs/add/operator/map';
import { UsersService } from '../../services/users.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { shoppingCart } from '../../pages/shopping-cart/shopping-cart';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  isAdmin:any={};
  cart$:Observable<shoppingCart>
  cartcount:any = 0;
  constructor(
    public auth: AuthService,
    private userService: UsersService,
    private shoppingCartServe : ShoppingCartService,
  ) {    
     
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartServe.getCart();
    this.cart$.subscribe(u =>{      
      let count = 0;
        for(let productId in u.item){
            count += u.item[productId].quantity;
        }
      this.cartcount = count;
    })
    
    //console.log(this.shoppingCart )
    // cart$.subscribe(cart => {
    //   this.shoppingCartItems = 0;
    //   for(let productId in cart.item)
    //    this.shoppingCartItems += cart.item[productId].quantity;
    // })

    this.auth.user$.subscribe(user =>{
      if(user){
        this.userService.get(user.uid).subscribe(user => this.isAdmin = user);
      }else{
       this.isAdmin ={}
      }
    })
  }

  
  logout() {
    this.auth.logout();
  }

}
