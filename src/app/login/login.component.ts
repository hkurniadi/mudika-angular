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
  userIsLoggedin: boolean = false;

  constructor(
    public afAuth: AngularFireAuth // is equivalent to firebase namespace
  ) {
    this.user = afAuth.authState; // the property returns Observable<firebase.User> (i.e. firebase.user object)

    // This subscription is to check user current state whether loggedin or not (the checking is ongoing since it is an observable)
    this.user.subscribe(
      // 'value' is whatever value emitted by afAut.authState whenever it emits new value
      (value) => {
        if (value !== null) { // is currentUser object is not null i.e. user is logged in
          this.userIsLoggedin = true;
          console.log("User is signed in", value);
          // TODO: add redirection to fill up more info about the user (e.g. location, school, etc)
        } else {
          this.userIsLoggedin = false;
          console.log("User is not signed in");
        }
      },
      (err) => {
        console.log("Errors occured", err);
      },
      () => {
        console.log("Finished");
      }
    );
  }

  login() {
    // AngularFireAuth.auth (i.e. afAuth.auth) returns an initialized firebase.auth.Auth instance
    // returns void, need to call getRedirectResult() to retreive login result
    this.afAuth.auth.signInWithRedirect(this.googleSigninProvider);
  }

  logout() {
    this.afAuth.auth.signOut() // returns void
    this.userIsLoggedin = false;
  } 
}

// TODO
// DONE 1. fix redirection after signing in to check if user is logged in
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