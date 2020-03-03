import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute
  ) {}

  routerSubscription: Subscription;
  user: string;

  ngOnInit() {
    this.routerSubscription = this.route.queryParams.subscribe(param => {
      this.user = param.email;
    });
  }

  signOut() {
    this.authenticationService.signOut();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
