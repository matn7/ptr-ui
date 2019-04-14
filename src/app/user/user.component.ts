import { Component, OnInit, HostListener } from "@angular/core";
import { ToggleService } from "../services/data/toggle.service";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "./user.model";
import { CustomErrorMessageService } from "../services/data/custom-error-message.service";
import { Subscriber, Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  isChecked: boolean;
  username: string;
  userData: any;
  // userData2: User;
  returnUrl: string;

  constructor(private toggleService: ToggleService, 
    private userService: UserService,
    private authService: AuthenticationService,
    private customErrorMsgService: CustomErrorMessageService) {}

  ngOnInit() {
    this.toggle();
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
        this.customErrorMsgService.displayMessage(error, this.returnUrl);
      }
    );
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleUser();
  }

  onChange($event) {
    console.log($event);
  }
}
