import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/throw";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Days } from "./days.model";
import { Subject } from "rxjs/Subject";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class DaysService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getDays(username, id) {
    return this.http
      .get<Days>(`${API_URL}/${API_VERSION}/users/${username}/days/${id}`)
      .catch(this.handleErrorService.handleError);
  }

  getDaysByYearMonthDay(username, year, month, day) {
    return this.http
      .get<Days>(
        `${API_URL}/${API_VERSION}/users/${username}/days/${year}/${month}/${day}`
      )
      .catch(this.handleErrorService.handleError);
  }

  createDays(username, resource) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/users/${username}/days`, resource)
      .catch(this.handleErrorService.handleError);
  }

  updateDays(username, id, resource) {
    return this.http
      .put<Days>(`${API_URL}/${API_VERSION}/users/${username}/days/${id}`, resource)
      .catch(this.handleErrorService.handleError);
  }

  deleteDays(username, id) {
    return this.http
      .delete(`${API_URL}/${API_VERSION}/users/${username}/days/${id}`)
      .catch(this.handleErrorService.handleError);
  }
}
