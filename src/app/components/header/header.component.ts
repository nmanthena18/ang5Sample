import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import 'rxjs/add/operator/map';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin:any={};
  constructor(
    public auth: AuthService,
    private userService: UsersService
  ) {    
     this.auth.user$.subscribe(user =>{
       if(user){
         this.userService.get(user.uid).subscribe(user => this.isAdmin = user);
       }else{
        this.isAdmin ={}
       }
     })
  }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
  }

}
