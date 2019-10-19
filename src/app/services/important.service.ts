import { Injectable } from "@angular/core";
import { RequestOptions, Headers } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { Important } from "../important/important.model";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class ImportantService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getImportantIndexData(username, year, month) {
    return this.http
      .get<Important[]>(
        `${API_URL}/${API_VERSION}/users/${username}/important/${year}/${month}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getImportantTask(username, num, id) {
    return this.http
      .get<Important>(
        `${API_URL}/${API_VERSION}/users/${username}/important/${num}/${id}`
      )
      .catch(this.handleErrorService.handleError);
  }

  createImportantTask(username, num, resource) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/users/${username}/important/${num}`, resource)
      .catch(this.handleErrorService.handleError);
  }

  updateImportantTask(username, num, id, resource) {
    // JSON.stringify({ isRead: true })
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put<Important>(
        `${API_URL}/${API_VERSION}/users/${username}/important/${num}/${id}`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  deleteImportantTask(username, num, id) {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    return this.http
      .delete(`${API_URL}/${API_VERSION}/users/${username}/important/${num}/${id}`)
      .catch(this.handleErrorService.handleError);
  }
}
