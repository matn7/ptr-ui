import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ErrorService } from "../../services/data/error.service";
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
    private router: Router,
    private errorService: ErrorService
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
          this.errorService.displayMessage(error, this.returnUrl);
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
