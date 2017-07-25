import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GoogleSigninService } from '../google-signin.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  members: FirebaseListObservable<any[]>;
  userIsLoggedin: boolean;
  user;

  constructor(
    db: AngularFireDatabase,
    private googleSigninService: GoogleSigninService
  ) {
    this.user = this.googleSigninService.user;
    this.user.subscribe(
      (value) => {
        if (value !== null) {
          this.userIsLoggedin = true;
          this.members = db.list('/members');
          console.log("<Dashboard> User is signed in", value);
          // console.log("Members: ", this.members);
        } else {
          this.userIsLoggedin = false;
          console.log("<Dashboard>  User is not signed in");
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

}

// TODO: 
/*
1. Add redirection for first time login: location, school, home cell (it's a drop down)
1. Preapare member data structure

*/
