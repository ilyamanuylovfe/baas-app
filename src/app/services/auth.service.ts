import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnInit {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  userData: Observable<firebase.User>;

  ngOnInit() {
    this.userData = this.angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(["/home"], {
          queryParams: { email: res.user.email }
        });
      })
      .catch(error => {
        alert("Looks like you have already created a user with this email.");
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.getLoggedInUser(res.user.email);
        this.router.navigate(["/home"], {
          queryParams: { email: res.user.email }
        });
      })
      .catch(err => {
        alert("You are not registered in the app. Please sign up.");
      });
  }

  getLoggedInUser(userEmail: string) {
    return userEmail;
  }

  getNewUser(newUserEmail: string) {
    return newUserEmail;
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
}
