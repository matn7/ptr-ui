import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class StatisticsTaskService {
  month: number;
  year: number;

  roleSetEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getImportantTaskCount(username, target, num, resource): Observable<Map<string, string>> {
    console.log('getImportantTaskCount');
    let keyArray = [0, 25, 50, 75, 100];

    return this.http
      .post<Map<string, string>>(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/${target}/${num}/count`,
        resource
      )
      .pipe(
        map( data => {
          const avg = new Map<string, string>();
          for (const element of keyArray) {
            avg[element] = data[element];
          }
          return avg;
        })
      ).catch(this.handleErrorService.handleError);
  }

  getImportantTaskAvg(username, target, num, year) : Observable<Array<number>> {
    return this.http
      .get<Array<number>>(
        `${API_URL}/${API_VERSION}/users/${username}/statistics/${target}/${num}/avg/${year}`
      )
      .pipe(
        map( data => {
          const avg = new Array<number>();
          for (const element of data) {
            avg.push(element);
          }

          return avg;
        })
      );
  }

  getImportantStartEnd(username, component, num, resource) {
    return this.http
    .post(
      `${API_URL}/${API_VERSION}/users/${username}/statistics/${component}/${num}/startEnd`,
      resource
    )
    .catch(this.handleErrorService.handleError);
  }
}
