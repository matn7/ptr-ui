import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/throw";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class StatisticsDaysService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  retrieveDaysByUsernameAndYear(username, resource) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/days/yearData`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  retrieveDaysByUsernameMonthAndYear(username, resource) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/days/monthData`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  retrieveMonthWeekDaysByUsernameMonthAndYear(username, resource) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/days/monthDaysData`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  retrieveAvgDaysByUsernameAndYear(username, resource) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/days/yearAvgData`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }
}
