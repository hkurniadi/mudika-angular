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
    this.user = afAuth.authState; // the property returns Observable<firebase.User> (i.e. firebase.user object)
  }

  login() {
    // this.webService.login(this.loginPayload);

    // AngularFireAuth.auth (i.e. afAuth.auth) returns an initialized firebase.auth.Auth instance
    
    // returns void, need to call getRedirectResult() to retreive login result
    this.afAuth.auth.signInWithRedirect(this.googleSigninProvider);

    // this.afAuth.auth.getRedirectResult()
    //     .then(function(result) {
    //       if (result) {
    //         console.log("Successfully logged in");
    //         console.log("Login info:", result);
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log("Error while loggin in:", err);
    //     });
  }

  getRedirectResult() {
    this.afAuth.auth.getRedirectResult()
        .then(function(result) {
          if (result) {
            console.log("Successfully logged in");
            console.log("Login info:", result);
          }
        })
        .catch(function(err) {
          console.log("Error while loggin in:", err);
        });
  }

  isLoggedin() {
    let currentUserState = this.afAuth.auth.currentUser;
    return currentUserState;
  }

  logout() {
    this.afAuth.auth.signOut() // returns void
  } 
}

// TODO
// 1. fix redirection after signing in to check if user is logged in
// 2. connect registered user in Authentication to the database
// 3. check if the iframe element in the console unsafe 

// User flow
/*

login()

if (newUser) {
  redirect to form page
  fill in extra info (e.g. locaiton, school, etc)
} 

redirect to dashboard

*/