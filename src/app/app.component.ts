import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router:Router,
    private userService : UsersService
  ){
    this.auth.user$.subscribe(user =>{
      if(user) {
        this.userService.save(user); 
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
