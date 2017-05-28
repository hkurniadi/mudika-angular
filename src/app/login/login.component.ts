import { Component, ElementRef, AfterViewInit } from '@angular/core';

import { WebService } from '../web.service';
import { GoogleSigninService } from '../google-signin.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  loginPayload = {
    email: '',
    password: ''
  }

  constructor(
    private element: ElementRef,
    private webService: WebService,
    private googleSigninService: GoogleSigninService
  ) {
    console.log("Element:", element);
  }

  ngAfterViewInit() {
    this.googleSigninService.googleSigninInit(this.element.nativeElement.firstChild);
  }

  login() {
    this.webService.login(this.loginPayload);
  }
}
