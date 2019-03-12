import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_URL,
  API_VERSION,
  TOKEN,
  AUTHENTICATED_USER,
  TOKEN_EXPIRED
} from "../app.constants";
import { map } from "rxjs/operators";
import { HandleErrorsService } from "./handle-errors.service";
import { Observable } from "rxjs";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { NotAuthorizedError } from "../common/not-authorized-error";
import { AppError } from "../common/app-error";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  executeJWTAuthenticationService(username, password) {
    return this.http
      .post<any>(`${API_URL}/${API_VERSION}/login`, {
        username,
        password
      })
      .pipe(
        map(data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `${data.token}`);
          return data;
        })
      )
      .catch(this.handleError);
  }

  refreshToken() {
    return this.http.get(`${API_URL}/${API_VERSION}/users/refresh`);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedToken) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  isTokenExpired() {
    const token = sessionStorage.getItem(TOKEN_EXPIRED);
    return !(token === null);
  }

  getTokenExpiredMessage() {
    return sessionStorage.getItem(TOKEN_EXPIRED);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.status, error["error"]));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error.status, error["error"]));
    }
    if (error.status === 401) {
      return Observable.throw(
        new NotAuthorizedError(error.status, error["error"])
      );
    }
    return Observable.throw(new AppError(error));
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
