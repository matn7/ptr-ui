import { Injectable } from "@angular/core";
import { RequestOptions, Headers } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";

import { Task } from "../task.model";
import { HandleErrorsService } from "./handle-errors.service";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getTaskIndexData(username, target, year, month) {
    return this.http
      .get<Task[]>(
        `${API_URL}/${API_VERSION}/users/${username}/${target}/${year}/${month}`
      )
      .catch(this.handleErrorService.handleError);
  }

  getTask(username, target, num, id) {
    return this.http
      .get<Task>(
        `${API_URL}/${API_VERSION}/users/${username}/${target}/${num}/${id}`
      )
      .catch(this.handleErrorService.handleError);
  }

  createTask(username, target, num, resource) {
    return this.http
      .post(`${API_URL}/${API_VERSION}/users/${username}/${target}/${num}`, resource)
      .catch(this.handleErrorService.handleError);
  }

  updateTask(username, target, num, id, resource) {
    // JSON.stringify({ isRead: true })
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put<Task>(
        `${API_URL}/${API_VERSION}/users/${username}/${target}/${num}/${id}`,
        resource
      )
      .catch(this.handleErrorService.handleError);
  }

  deleteTask(username, target, num, id) {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    return this.http
      .delete(`${API_URL}/${API_VERSION}/users/${username}/${target}/${num}/${id}`)
      .catch(this.handleErrorService.handleError);
  }
}
