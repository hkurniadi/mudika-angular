import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { WebService } from './web.service';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor (
    db: AngularFireDatabase,
    private webService: WebService,
    private googleSigninService: GoogleSigninService
  ) {
    // .list() method (i.e. listening) takes in the node name in the firbase as its parameter
    // This will also return an Observable, so we need to subscribe to it
    this.items = db.list('/items');
    console.log(this.items);
  }
  title = 'Mudika Vancouver';
}
