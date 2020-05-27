import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { Router } from "@angular/router";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { EMAIL_REQUIRED_VALIDATOR, EMAIL_INVALID_VALIDATOR } from "../../app.constants";

@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: ["./password-reset.component.css"]
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup;
  errorMessage: string;
  returnUrl: string;

  readonly email_required_validator = EMAIL_REQUIRED_VALIDATOR;
  readonly email_invalid_validator = EMAIL_INVALID_VALIDATOR;

  constructor(
    private registrationService: RegistrationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.returnUrl = "/login";
    this.initForm();
  }

  requestResetPassword() {
    this.registrationService
      .resetPassword(this.passwordResetForm.value)
      .subscribe(
        response => {
          this.router.navigate(["/login"]);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  private initForm() {
    const email = "";

    this.passwordResetForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email])
    });
  }
}
