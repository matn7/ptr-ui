import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable()
export class StatisticsImportantService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getImportantTaskCount(username, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/important/${num}/count/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getImportantTaskAvg(username, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/important/${num}/avg/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getImportantStartEnd(username, num, resource) {
    console.log("Resource - startDate: " + resource.startDate);
    console.log("Resource - endDate: " + resource.endDate);
    return this.http
    .post(
      `${API_URL}/${API_VERSION}/users/${username}/statistics/important/${num}/startEnd`,
      resource
    )
    .catch(this.handleErrorService.handleError);
  }
}
