import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  constructor(public authenticationService: AuthService) {}

  @Input() isNewUser: boolean;

  shouldShowPassword: boolean;
  email: string;
  password: string;

  ngOnInit(): void {}

  signIn() {
    if (this.isNewUser) {
      this.authenticationService.signUp(this.email, this.password);
    } else {
      this.authenticationService.signIn(this.email, this.password);
    }
    this.email = "";
    this.password = "";
  }

  submitForm() {
    const emailRegexp = /\S+@\S+\.\S+/;
    const isEmailValid = emailRegexp.test(this.email);
    if (isEmailValid && this.password.length > 6) {
      this.signIn();
    } else {
      alert("Invalid email or too small password (6 symbols minimum)");
    }
  }

  togglePassword() {
    this.shouldShowPassword = !this.shouldShowPassword;
  }
}
