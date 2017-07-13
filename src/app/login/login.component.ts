import { Component } from '@angular/core';
import { GoogleSigninService } from '../google-signin.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userIsLoggedin: boolean;
  user;

  constructor(
    private googleSigninService: GoogleSigninService
  ) {
    this.user = this.googleSigninService.user;
    this.user.subscribe(
      // 'value' is whatever value emitted by afAut.authState whenever it emits new value
      (value) => {
        if (value !== null) { // is currentUser object is not null, then user is logged in
          this.userIsLoggedin = true;
          console.log("<Login> User is signed in", value);
          // TODO: 
          // 1. add redirection to fill up more info about the user (e.g. location, school, etc)
          // 2. improve performance after logging in is still currently slow
        } else {
          this.userIsLoggedin = false;
          console.log("<Login> User is not signed in");
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

  login(){
    this.googleSigninService.login();
  }

  logout() {
    this.googleSigninService.logout();
    this.userIsLoggedin = false;
  }

}

// TODO
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