import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }
  loginBack() {
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() );
  }
}
