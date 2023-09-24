import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../registration.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { USER_CREATED_MSG, USERNAME_LENGTH_VALIDATOR, USERNAME_REQUIRED_VALIDATOR, PASSWORD_LENGTH_VALIDATOR, PASSWORD_REQUIRED_VALIDATOR, USERNAME_DUPLICATED_VALIDATOR, EMAIL_REQUIRED_VALIDATOR, EMAIL_INVALID_VALIDATOR, FIRSTNAME_REQUIRED_VALIDATOR, LASTNAME_REQUIRED_VALIDATOR, PASSWORD_PATTERN_VALIDATOR } from "../../app.constants";
import { ErrorService } from "../../services/data/error.service";
import { MatchPassword } from "../validators/match-password";

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

    messages: string[];

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
        private matchPassword: MatchPassword,
        private registrationService: RegistrationService,
        private handleError: HandleErrorsService,
        private router: Router,
        private errorService: ErrorService
    ) { }

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
                    this.errorService.displayBackendMessage(
                        USER_CREATED_MSG
                    );
                },
                error => {
                    console.log("*******************");
                    console.log(JSON.stringify(error));
                    console.log("*******************");
                    console.log(error.errorMsg['errorMessages']);
                    // Get registration error message in format
                    this.errorService.displayBackendMessages(
                        error.errorMsg['errorMessages'],
                        error.errorMsg['affectedFields']
                    );

                    for (let field of error.errorMsg['affectedFields']) {
                        this.registrationForm.controls[field].setErrors({'incorrect': true});
                    }
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
            username: new FormControl(username, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(50)
            ]),
            password: new FormControl(password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(60)
                // Validators.pattern("^(?=.*?\\p{Lu})(?=.*?\\p{Ll})(?=.*?\\d)(?=.*?[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:'\",<.>/?]).*$")]
            ]),
            confirmPassword: new FormControl(confirmPassword, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(60)
                // Validators.pattern('[a-zA-Z ]*')
                // Validators.pattern("^(?=.*?\\p{Lu})(?=.*?\\p{Ll})(?=.*?\\d)(?=.*?[`~!@#$%^&*()\\-_=+\\\\|\\[{\\]};:'\",<.>/?]).*$")
            ]),
            email: new FormControl(email, [Validators.required, Validators.email]),
            firstName: new FormControl(firstName, Validators.required),
            lastName: new FormControl(lastName, Validators.required)
        }, { validators: [this.matchPassword.validate] });
    }

    // {
    //     "errorStatus": 400,
    //     "errorMsg": {
    //       "body": null,
    //       "httpStatus": "BAD_REQUEST",
    //       "errorMessages": [
    //         "Username cannot starts with panda",
    //         "Password must contain at least one number, one special character, one upper and lower case letter"
    //       ],
    //       "affectedFields": [
    //         "password",
    //         "username"
    //       ],
    //       "statusCode": 400
    //     }
    //   }
}
