import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { WebService } from '../web.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  members: FirebaseListObservable<any[]>;

  constructor(
    private webService: WebService,
    db: AngularFireDatabase
  ) {
    this.members = db.list('/members');
    console.log("Members: ", this.members);
  }

  ngOnInit() {}

}

// TODO: 
// 1. Add buttons in the index page to navigate the router (i.e. dashboard button, news button, etc) 
// 2. setup login with Google and retrieve some data from it
