import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../services/registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HandleErrorsService } from "../services/handle-errors.service";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { USER_CREATED_MSG, USERNAME_LENGTH_VALIDATOR, USERNAME_REQUIRED_VALIDATOR, PASSWORD_LENGTH_VALIDATOR, PASSWORD_REQUIRED_VALIDATOR, USERNAME_DUPLICATED_VALIDATOR, EMAIL_REQUIRED_VALIDATOR, EMAIL_INVALID_VALIDATOR, FIRSTNAME_REQUIRED_VALIDATOR, LASTNAME_REQUIRED_VALIDATOR, PASSWORD_PATTERN_VALIDATOR } from "../app.constants";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html"
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

  readonly username_length_validator = USERNAME_LENGTH_VALIDATOR;
  readonly username_required_validator = USERNAME_REQUIRED_VALIDATOR;
  readonly username_duplicated_validator = USERNAME_DUPLICATED_VALIDATOR;

  readonly password_length_validator = PASSWORD_LENGTH_VALIDATOR;
  readonly password_required_validator = PASSWORD_REQUIRED_VALIDATOR;
  readonly password_pattern_validator = PASSWORD_PATTERN_VALIDATOR;

  readonly email_required_validator = EMAIL_REQUIRED_VALIDATOR;
  readonly email_invalid_validator = EMAIL_INVALID_VALIDATOR;

  readonly firstname_required_validator = FIRSTNAME_REQUIRED_VALIDATOR;
  readonly lastname_required_validator = LASTNAME_REQUIRED_VALIDATOR;

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
          this.errorMessage = this.handleError.displayErrorMessage(
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
    const username = this.username;
    const password = this.password;
    const confirmPassword = this.confirmPassword;
    const email = this.email;
    const firstName = this.firstName;
    const lastName = this.lastName;

    this.registrationForm = new FormGroup({
      username: new FormControl(username, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(50)
      ]),
      password: new FormControl(password, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(60)
        // Validators.pattern("^(?=.*?\\p{Lu})(?=.*?\\p{Ll})(?=.*?\\d)(?=.*?[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:'\",<.>/?]).*$")]
      ]),
      confirmPassword: new FormControl(confirmPassword, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(60)
        // Validators.pattern('[a-zA-Z ]*')
        // Validators.pattern("^(?=.*?\\p{Lu})(?=.*?\\p{Ll})(?=.*?\\d)(?=.*?[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:'\",<.>/?]).*$")
      ]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required)
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
