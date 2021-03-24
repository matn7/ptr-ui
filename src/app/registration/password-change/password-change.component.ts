import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorService } from "../../services/data/error.service";
import { PASSWORD_LENGTH_VALIDATOR, PASSWORD_REQUIRED_VALIDATOR, PASSWORD_PATTERN_VALIDATOR } from "../../app.constants";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.css"]
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;
  errorMessage: string;
  returnUrl: string;
  id: string;
  token: string;

  readonly password_length_validator = PASSWORD_LENGTH_VALIDATOR;
  readonly password_required_validator = PASSWORD_REQUIRED_VALIDATOR;
  readonly password_pattern_validator = PASSWORD_PATTERN_VALIDATOR;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.returnUrl = "/login";
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      this.token = params["token"];
    });

    this.initForm();
  }

  requestNewPassword() {
    this.registrationService
      .newPassword(this.id, this.token, this.passwordChangeForm.value)
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
    const password = "";
    const confirmPassword = "";

    this.passwordChangeForm = new FormGroup({
      password: new FormControl(password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]),
      confirmPassword: new FormControl(confirmPassword, [Validators.required])
    });
  }
}
