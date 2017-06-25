import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { WebService } from '../web.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  members: FirebaseListObservable<any[]>;

  constructor(
    // private webService: WebService,
    db: AngularFireDatabase
  ) {
    this.members = db.list('/members');
    console.log("Members: ", this.members);
  }

}

// TODO: 
/*
Step 1: implement google signin and password-authenticated signin, MAKE IT WORK FIRST THEN STRUCTURE THE DATABASE!
Step 2: structure the data (see Note for detail data needed)
*/
