import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  createNewUser(userEntity) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/register`, userEntity)
      .catch(this.handleErrorService.handleError);
  }

  activateUser(id, token) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/activatenewuser?id=${id}&token=${token}`,
        id
      )
      .catch(this.handleErrorService.handleError);
  }

  resetPassword(email) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/forgotpassword`, email)
      .catch(this.handleErrorService.handleError);
  }

  newPassword(id, token, password) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/changepassword?id=${id}&token=${token}`,
        password
      )
      .catch(this.handleErrorService.handleError);
  }
}
