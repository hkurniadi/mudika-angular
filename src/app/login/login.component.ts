import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // to create an Observable Firebase User
import { AngularFireAuth } from 'angularfire2/auth'; // enable use of Firebase Auth module
import * as firebase from 'firebase/app'; // to create a Firebase namespace instance

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: Observable<firebase.User>;
  googleSigninProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    public afAuth: AngularFireAuth // is equivalent to firebase namespace
  ) {
    this.user = afAuth.authState; // for checking the current user state in the application as 'user'
  }

  login() {
    // this.webService.login(this.loginPayload);

    // AngularFireAuth.auth (i.e. afAuth.auth) returns an initialized firebase.auth.Auth instance
    this.afAuth.auth.signInWithRedirect(this.googleSigninProvider) // returns void, need to call getRedirectResult() to retreive login result
    // this.afAuth.auth.getRedirectResult()
    //     .then(result => {
    //       if (result) {
    //         console.log("Successfully logged in");
    //         console.log("Login info:", result);
    //       }
    //     })
    //     .catch(err => {
    //       console.log("Error while loggin in:", err);
    //     });
  }

  logout() {
    this.afAuth.auth.signOut() // returns void
  } 
}

// TODO: fix error when redirected to Google Signin