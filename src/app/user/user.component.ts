import { Component, OnInit, HostListener } from "@angular/core";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../auth/authentication.service";
import { ErrorService } from "../services/data/error.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
  isChecked: boolean;
  username: string;
  userData: any;
  // userData2: User;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private errorService: ErrorService) {}

  ngOnInit() {
    this.isChecked = true;

    this.username = this.authService.getAuthenticatedUser();

    this.returnUrl = "/user/" + this.username;

    this.userData = this.userService
    .getUserDetails(this.username)
    .subscribe(
      data => {
        console.log(data);
        this.userData = data;
      },
      error => {
        console.log("Error in user component");
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }

  onChange($event) {
    console.log($event);
  }
}
