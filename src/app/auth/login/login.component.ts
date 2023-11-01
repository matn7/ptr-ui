import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TOKEN_EXPIRED, RETURN_URL } from "../../app.constants";
import { MessagesService } from "src/app/services/data/messages.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    tokenExpiredMessage = "";
    invalidLogin = false;
    loginForm: FormGroup;
    expiredToken = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService
    ) { }

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
                    this.messagesService.triggerMsgsFromBackend(
                        error.errorMsg['errorMessages']
                    );

                    for (let field of error.errorMsg['affectedFields']) {
                        this.loginForm.controls[field].setErrors({ 'incorrect': true });
                    }
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
