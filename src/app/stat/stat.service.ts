import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, API_VERSION } from '../app.constants';
import { HandleErrorsService } from '../services/handle-errors.service';
import { DaysBetween } from './model/daysbetween.model';
import { YearBetween } from './model/yearbetween.model';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  // convert to DaysBetween model
  daysBetween(username : string, resource : YearBetween) {
    return this.http
      .post<DaysBetween>(`${API_URL}/${API_VERSION}/users/${username}/stat/days/daysbetween`, resource)
      .catch(this.handleErrorService.handleError);
  }
}
