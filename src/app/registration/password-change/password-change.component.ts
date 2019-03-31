import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

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

  constructor(
    private registrationService: RegistrationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private route: ActivatedRoute,
    private customErrorMsgService: CustomErrorMessageService
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
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
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
