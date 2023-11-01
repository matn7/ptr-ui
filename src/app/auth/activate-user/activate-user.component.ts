import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../registration.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorService } from "../../services/data/error.service";
import { MessagesService } from "src/app/services/data/messages.service";

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
    private errorService: ErrorService,
    private messagesService: MessagesService
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
        this.messagesService.triggerMsgsFromBackend(
          response["message"]
        );
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }
}
