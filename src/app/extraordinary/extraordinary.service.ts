import { Injectable, OnInit } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/throw";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { Extraordinary } from "./extraordinary.model";
import { HandleErrorsService } from "../services/handle-errors.service";

@Injectable()
export class ExtraordinaryService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getExtraordinaryAll(username) {
    return this.http
      .get<Extraordinary[]>(
        `${API_URL}/${API_VERSION}/users/${username}/extraordinary/all`
      )
      .catch(this.handleErrorService.handleError);
  }

  getExtraordinaryByid(username, id) {
    return this.http
      .get<Extraordinary>(
        `${API_URL}/${API_VERSION}/users/${username}/extraordinary/${id}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getExtraordinaryByYearMonthDay(username, year, month, day) {
    return this.http
      .get<Extraordinary>(
        `${API_URL}/${API_VERSION}/users/${username}/extraordinary/${year}/${month}/${day}`
      )
      .catch(this.handleErrorService.handleError);
  }

  createExtraordinary(username, resource) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/users/${username}/extraordinary`, resource)
      .catch(this.handleErrorService.handleError);
  }

  updateExtraordinary(username, resource) {
    return this.http
      .put<Extraordinary>(
        `${API_URL}/${API_VERSION}/users/${username}/extraordinary`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  deleteExtraordinary(username, id) {
    return this.http
      .delete(`${API_URL}/${API_VERSION}/users/${username}/extraordinary/${id}`)
      .catch(this.handleErrorService.handleError);
  }
}
