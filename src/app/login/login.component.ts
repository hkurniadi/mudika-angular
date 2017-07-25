import { Component } from '@angular/core';
import { GoogleSigninService } from '../google-signin.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // User model
  userIsLoggedin: boolean;
  user;
 
  members;

  // Additional info data model
  additionalNeeded: boolean = false;
  schools: Array<string> = ['UBC', 'SFU', 'Douglas College', 'Langara College', 'Columbia College'];
  cellgroups: Array<string> = ['St. Sebastian', 'St. Raphael the Archangel', 'St. Fidelis', 'St. Odilia'];
  school: string;
  homeCell: string;

  constructor(
    private googleSigninService: GoogleSigninService,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.members = db.list('/members');
    this.user = this.googleSigninService.user;
    this.user.subscribe(
      // 'value' is whatever value emitted by afAut.authState whenever it emits new value
      (value) => {
        if (value !== null) { // is currentUser object is not null, then user is logged in
          this.userIsLoggedin = true;
          console.log("<Login> User is signed in", value);
          // Check if the logged in user is existing user
          this.checkExistingUser('name1');
          /* TODO: 
          1. DONE add redirection to fill up more info about the user (e.g. location, school, etc)
          2. improve performance after logging in is still currently slow
           */
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
    this.additionalNeeded = false;
  }

  checkExistingUser(userName: string) {
    this.members.subscribe(members => {
      members.forEach(member => {
        if (member.name === userName) {
          console.log("User exists");
          this.additionalNeeded = false;
          this.router.navigate(['/dashboard']);
          return;
        } else {
          console.log("User does not exist");
          this.additionalNeeded = true;
          // TODO: add the new user to db
          return;
        }
      });
      // console.log("DB Snaphot", members);
    });
  }

  onSubmit(value) {
    // console.log(value);
    this.additionalNeeded = false;
    this.router.navigate(['/dashboard']);
    // TODO: add the values from the form controls to the database
  }

  // get diagnostic() {
  //   return this.homeCell;
  // }

  // onEnter(value) {
  //   this.school = value;
  //   console.log("Template reference value", this.school);
  // }

}