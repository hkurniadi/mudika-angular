import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable()
export class GoogleSigninService {

  auth2: any;
  isAuthenticated: boolean = false;

  googleSigninInit(element) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '122770693861-n9mdl5sl1ncq132hvn7cbd5t2b39oc04.apps.googleusercontent.com'
      });
      console.log("User signed in");
      this.attachSignin(element);
      console.log("After attachsignin function");
    })
  }

  attachSignin(element) {
    // Attaches the sign-in flow to the specified container's click handler.
    console.log("In attachsignin function");
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        this.isAuthenticated = true;
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}