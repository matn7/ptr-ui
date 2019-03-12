import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable()
export class StatisticsLessImportantService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getLessImportantTaskCount(username, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/${username}/statistics/lessimportant/${num}/count/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getLessImportantTaskAvg(username, num, year) {
    return this.http
      .get(
        `${API_URL}/${API_VERSION}/${username}/statistics/lessimportant/${num}/avg/${year}`
      )
      .catch(this.handleErrorService.handleError);
  }
}
