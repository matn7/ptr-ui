import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TOKEN_EXPIRED, RETURN_URL, USERNAME_LENGTH_VALIDATOR, PASSWORD_LENGTH_VALIDATOR, USERNAME_REQUIRED_VALIDATOR, PASSWORD_REQUIRED_VALIDATOR } from "../../app.constants";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = "Invalid Credentials";
  tokenExpiredMessage = "";
  invalidLogin = false;
  loginForm: FormGroup;
  expiredToken = false;
  returnUrl: string;

  readonly username_length_validator = USERNAME_LENGTH_VALIDATOR;
  readonly username_required_validator = USERNAME_REQUIRED_VALIDATOR;
  readonly password_length_validator = PASSWORD_LENGTH_VALIDATOR;
  readonly password_required_validator = PASSWORD_REQUIRED_VALIDATOR;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.expiredToken = this.authenticationService.isTokenExpired();
    if (this.expiredToken) {
      this.tokenExpiredMessage = this.authenticationService.getTokenExpiredMessage();
    }
    this.returnUrl = "/login";
    this.initForm();
  }

  handleJWTAuthLogin() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    console.log(">>>>> username: " + this.username);

    this.authenticationService
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          if (sessionStorage.getItem("returnUrl") != null) {
            this.router.navigate([sessionStorage.getItem("returnUrl")]);
          } else {
            this.router.navigate(["welcome", this.username]);
          }
          sessionStorage.removeItem(RETURN_URL);
          if (sessionStorage.getItem(TOKEN_EXPIRED)) {
            sessionStorage.removeItem(TOKEN_EXPIRED);
          }
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          console.log(error);
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
  }

  private initForm() {
    const username = this.username;
    const password = this.password;

    this.loginForm = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      password: new FormControl(password, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
    });
  }
}
