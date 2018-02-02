import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { AppUser } from '../interfaces/appUserInterface';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  user$ : Observable<firebase.User>;
  private uid:any;
  constructor(
    private afAuth: AngularFireAuth,
    private route:ActivatedRoute,
    private UsersService : UsersService
  ) {
    this.user$ = afAuth.authState;
    
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  get adminUser():Observable<AppUser>{
        return this.user$.switchMap(user => this.UsersService.get(user.uid))
    }

}
