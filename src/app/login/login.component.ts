import { Component } from '@angular/core';
import { GoogleSigninService } from '../google-signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userIsLoggedin: boolean;
  user;
  schools: Array<string> = ['UBC', 'SFU', 'Douglas College', 'Langara College', 'Columbia College'];
  cellgroups: Array<string> = ['St. Sebastian', 'St. Raphael the Archangel', 'St. Fidelis', 'St. Odilia'];
  school: string;
  homeCell: string;

  constructor(
    private googleSigninService: GoogleSigninService,
    private router: Router
  ) {
    this.user = this.googleSigninService.user;
    this.user.subscribe(
      // 'value' is whatever value emitted by afAut.authState whenever it emits new value
      (value) => {
        if (value !== null) { // is currentUser object is not null, then user is logged in
          this.userIsLoggedin = true;
          console.log("<Login> User is signed in", value);
          // this.router.navigate(['/dashboard']);
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

  get diagnostic() {
    return this.homeCell;
  }

  // onEnter(value) {
  //   this.school = value;
  //   console.log("Template reference value", this.school);
  // }

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