import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-activate-user",
  templateUrl: "./activate-user.component.html"
})
export class ActivateUserComponent implements OnInit {
  errorMessage: string;
  returnUrl: string;
  id: string;
  token: string;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private appInternalMessageService: AppInternalMessagesService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.returnUrl = "/login";
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      this.token = params["token"];
    });
  }

  activateAccount() {
    this.registrationService.activateUser(this.id, this.token).subscribe(
      response => {
        this.router.navigate(["/login"]);
        this.appInternalMessageService.triggerMsgFromBackend(
          response["message"]
        );
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }
}
