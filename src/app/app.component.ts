import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { WebService } from './web.service';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  // instead of FirebaseListObservable, use tje following
  // items: FirebaseObjectObservable<any>;
  constructor (
    db: AngularFireDatabase,
    private webService: WebService,
    private googleSigninService: GoogleSigninService
  ) {
    // .list() method (i.e. listening) takes in the node name in the firbase as its parameter
    // This will also return an Observable, so we need to subscribe to it
    this.items = db.list('/members');
    // this.items = db.object('/members');
    console.log("Items: ", this.items);
  }
  title = 'Mudika Vancouver';
}

// TODO: add more mock data, move the data retreival to Dashboard component
