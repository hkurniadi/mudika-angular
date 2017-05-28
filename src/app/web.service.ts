import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class WebService {
  isAuthenticated = false;

  constructor(private router: Router) {}

  login(payload) {
    console.log("Login function invoked", payload);
    this.isAuthenticated = true;
    this.router.navigate(['/dashboard']);
  }

  getUserData() {
    let data = {
      firstName: 'Hans',
      lastName: 'Kurniadi',
      email: 'hans.d.k@live.com',
      location: 'Coquitlam'
    };

    return data;
  }

  logout() {
    console.log("User is logged out");
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }
}