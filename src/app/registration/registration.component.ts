import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../services/registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HandleErrorsService } from "../services/handle-errors.service";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { USER_CREATED_MSG } from "../app.constants";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  errorMessage: string;
  returnUrl: string;
  isDuplicated: boolean;

  registrationForm: FormGroup;

  constructor(
    private registrationService: RegistrationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private appInternalMessageService: AppInternalMessagesService
  ) {}

  ngOnInit() {
    this.returnUrl = "/register";
    this.isDuplicated = false;
    this.initForm();
  }

  registerNewUser() {
    this.registrationService
      .createNewUser(this.registrationForm.value)
      .subscribe(
        response => {
          this.router.navigate(["/login"]);
          this.appInternalMessageService.triggerMsgFromBackend(
            USER_CREATED_MSG
          );
        },
        error => {
          this.isDuplicated = true;
          this.errorMessage = this.handleError.displayRegistrationErrorMessage(
            error.errorStatus,
            error.errorMsg,
            this.returnUrl
          );
          this.appInternalMessageService.triggerMsgFromBackend(
            this.errorMessage
          );
        }
      );
  }

  private initForm() {
    const username = "";
    const password = "";
    const confirmPassword = "";
    const email = "";
    const firstName = "";
    const lastName = "";

    this.registrationForm = new FormGroup({
      username: new FormControl(username, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl(password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]),
      confirmPassword: new FormControl(confirmPassword, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      firstName: new FormControl(firstName, Validators.maxLength(50)),
      lastName: new FormControl(lastName, Validators.maxLength(50))
    });
  }

  // todo confirmation password finish
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.registrationForm.get("password").value
      ? null
      : {
          NotEqual: true
        };
  }
}
