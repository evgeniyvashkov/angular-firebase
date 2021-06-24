import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebaseAuthentication: AngularFireAuth) { }

  authenticateWithGoogle() {
    const authenticationProvider = new auth.GoogleAuthProvider();
    return this.firebaseAuthentication.signInWithPopup(authenticationProvider);
  }

  signOut() {
    return this.firebaseAuthentication.signOut();
  }
}
