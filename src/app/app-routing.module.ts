import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { canActivate } from "@angular/fire/auth-guard";
import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  {
    path: "home",
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLanding)
  },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
