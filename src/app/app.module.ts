import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { UsersService } from './services/users.service';
import { AdminAuth } from './guards/admin-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'products', component: ProductsComponent},

      {path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard]},
      {path: 'shopping-cart', component: ShoppingCartComponent, canActivate:[AuthGuard]},
      {path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate:[AuthGuard]},

      {path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard, AdminAuth]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard, AdminAuth]},
    ])
  ],
  providers: [
    AngularFireAuth, 
    AuthService,
    UsersService,
    AuthGuard,
    AdminAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
