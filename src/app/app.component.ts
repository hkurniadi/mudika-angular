import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
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
          console.log("User is signed in", value);
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

  logout() {
    this.googleSigninService.logout();
    this.userIsLoggedin = false;
  }

}