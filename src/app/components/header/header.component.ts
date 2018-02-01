import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user$.map(user => {
      console.log(user, 5555);
    })
  }

  logout() {
    this.auth.logout();
  }

}
