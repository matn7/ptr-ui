import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { LessImportant } from "../lessimportant/lessimportant.model";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class LessImportantService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getLessImportantIndexData(username, year, month) {
    return this.http
      .get<LessImportant[]>(
        `${API_URL}/${API_VERSION}/users/${username}/lessimportant/${year}/${month}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getLessImportantTask(username, num, id): Observable<LessImportant> {
    return this.http
      .get<LessImportant>(
        `${API_URL}/${API_VERSION}/users/${username}/lessimportant/${num}/${id}`
      )
      .catch(this.handleErrorService.handleError);
  }

  createLessImportantTask(username, num, resource) {
    return this.http
      .post(
        `${API_URL}/${API_VERSION}/users/${username}/lessimportant/${num}`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  updateLessImportantTask(username, num, id, resource) {
    return this.http
      .put<LessImportant>(
        `${API_URL}/${API_VERSION}/users/${username}/lessimportant/${num}/${id}`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }


  deleteLessImportantTask(username, num, id) {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    return this.http
      .delete(
        `${API_URL}/${API_VERSION}/users/${username}/lessimportant/${num}/${id}`
      )
      .catch(this.handleErrorService.handleError);
  }
}
