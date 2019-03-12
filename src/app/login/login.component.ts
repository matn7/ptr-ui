import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TOKEN_EXPIRED, RETURN_URL } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../services/data/custom-error-message.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private handleError: HandleErrorsService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
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
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  private initForm() {
    const username = "";
    const password = "";

    this.loginForm = new FormGroup({
      username: new FormControl(username, Validators.required),
      password: new FormControl(password, Validators.required)
    });
  }
}
