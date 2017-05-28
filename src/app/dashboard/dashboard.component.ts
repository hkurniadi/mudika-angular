import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    location: ''
  }

  constructor(private webService: WebService) { }

  ngOnInit() {
    let data = this.webService.getUserData();
    this.user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      location: data.location
    };
  }

}
