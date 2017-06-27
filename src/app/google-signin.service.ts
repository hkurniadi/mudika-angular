import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // to create an Observable Firebase User
import { AngularFireAuth } from 'angularfire2/auth'; // enable use of Firebase Auth module
import * as firebase from 'firebase/app'; // to create a Firebase namespace instance

@Injectable()
export class GoogleSigninService {

  user: Observable<firebase.User>;
  googleSigninProvider = new firebase.auth.GoogleAuthProvider();
  userIsLoggedin: boolean;

  constructor(
    public afAuth: AngularFireAuth, // is equivalent to firebase namespace
  ) {
    this.user = this.afAuth.authState; // the property returns Observable<firebase.User> (i.e. firebase.user object which will have value when signIn() is sucessful)
  }

  /* Was going to create the subscribe method, but apparently subscribing can't be exported, has to be done directly in the component that's using it */

  login() {
    // AngularFireAuth.auth (i.e. afAuth.auth) returns an initialized firebase.auth.Auth instance
    this.afAuth.auth.signInWithRedirect(this.googleSigninProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  } 
}