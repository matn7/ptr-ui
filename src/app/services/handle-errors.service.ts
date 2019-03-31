import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { NotAuthorizedError } from "../common/not-authorized-error";
import { AppError } from "../common/app-error";
import { RETURN_URL, TOKEN_EXPIRED } from "../app.constants";
import { UnsupportedMediaTypeError } from "../common/unsupported-media-type-error";

export const INTERNAL_APP_ERROR = "internalAppError";

@Injectable({
  providedIn: "root"
})
export class HandleErrorsService {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  displayErrorMessage(errorNumber, errorMsg, redirectUrl) {
    if (errorNumber === 401) {
      console.log(errorMsg);
      return this.handle401Error(redirectUrl, errorMsg);
    }
    if (errorNumber === 404) {
      return "Not found";
    }
    if (errorNumber === 400) {
      return "Bad request";
    }
    if (errorNumber === 415) {
      return "Unsupported media type, you should not see this error :?";
    }
    if (errorNumber === 500) {
      return "Very bad";
    }
  }

  displayDayErrorMessage(errorNumber, year, month, day, redirectUrl) {
    if (errorNumber === 401) {
      return this.handle401Error(redirectUrl, null);
    }
    if (errorNumber === 404) {
      return "Record not found in " + year + "/" + month + "/" + day;
    }
    if (errorNumber === 400) {
      return "Bad request";
    }
    if (errorNumber === 500) {
      return "Very bad";
    }
  }

  displayRegistrationErrorMessage(errorNumber, errorMsg, redirectUrl) {
    if (errorNumber === 401) {
      return this.handle401Error(redirectUrl, errorMsg);
    }
    if (errorNumber === 404) {
      return "404 Record not found";
    }
    if (errorNumber === 400) {
      return errorMsg;
    }
    if (errorNumber === 500) {
      return "Very bad";
    }
  }

  handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.status, error["error"]));
    }
    if (error.status === 401) {
      return Observable.throw(
        new NotAuthorizedError(error.status, error["error"])
      );
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error.status, error["error"]));
    }
    if (error.status === 415) {
      return Observable.throw(
        new UnsupportedMediaTypeError(error.status, error["error"])
      );
    }
    return Observable.throw(new AppError(error));
  }

  private handle401Error(redirectUrl, errorMsg) {
    const stringifyErrMsg = JSON.stringify(errorMsg);

    console.log(errorMsg);

    const parsedMsg = JSON.parse(stringifyErrMsg);

    if (parsedMsg.tokenExpired) {
      console.log("Token expired");
      this.authService.logout();

      sessionStorage.setItem(RETURN_URL, redirectUrl);
      sessionStorage.setItem(TOKEN_EXPIRED, "Token has expired need to log out");
      this.router.navigate(["login"], {
        queryParams: { returnUrl: redirectUrl }
      });
      return parsedMsg.tokenExpired;
    } else if(parsedMsg.username && parsedMsg.password) {
      console.log("Invalid username or password");
      return parsedMsg.username + " or " + parsedMsg.password;
    }else {
      console.log("Max login attempts");
      return parsedMsg;
    }
  }
}
