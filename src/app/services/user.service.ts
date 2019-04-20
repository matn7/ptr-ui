import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getUserDetails(username) {
    return this.http
      .get<User>(
        `${API_URL}/${API_VERSION}/${username}`
      )
      .catch(this.handleErrorService.handleError);
  }
}
