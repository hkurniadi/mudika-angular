import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'Mudika Vancouver';
  userIsLoggedin: boolean;
  
  constructor(
    private googleSigninService: GoogleSigninService
  ) {
    this.googleSigninService.user.subscribe(
      (value) => {
        if (value !== null) {
          this.userIsLoggedin = true;
          console.log("<App> User is signed in", value);
        } else {
          this.userIsLoggedin = false;
          console.log("<App> User is not signed in");
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

  logout() {
    this.googleSigninService.logout();
    this.userIsLoggedin = false;
  }

}

// TODO:
// 1. Make the login state global