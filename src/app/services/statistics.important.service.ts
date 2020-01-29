import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable()
export class StatisticsTaskService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getImportantTaskCount(username, target, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/${target}/${num}/count/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getImportantTaskAvg(username, target, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/${target}/${num}/avg/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getImportantStartEnd(username, component, num, resource) {
    console.log("Resource - startDate: " + resource.startDate);
    console.log("Resource - endDate: " + resource.endDate);
    return this.http
    .post(
      `${API_URL}/${API_VERSION}/users/${username}/statistics/${component}/${num}/startEnd`,
      resource
    )
    .catch(this.handleErrorService.handleError);
  }
}
