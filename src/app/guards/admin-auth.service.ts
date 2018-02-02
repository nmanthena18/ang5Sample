import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class AdminAuth implements CanActivate{

  constructor(
    private auth:AuthService,
    private userService:UsersService
  ) { }
  canActivate(): Observable<boolean>{
    return this.auth.adminUser
      .map(appUser => appUser.isAdmin)
  }
}
