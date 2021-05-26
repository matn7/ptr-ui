import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./auth/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  isLoggedInUser: boolean;

  constructor(private authService: AuthenticationService) {}

  myType = 'PieChart';
  myData = [
      ['London', 8136000],
      ['New York', 8538000],
      ['Paris', 2244000],
      ['Berlin', 3470000],
      ['Kairo', 19500000]
  ];  

  ngOnInit() {
    this.isLoggedInUser = this.authService.isUserLoggedIn();
  }
}
