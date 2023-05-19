import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, API_VERSION } from '../app.constants';
import { HandleErrorsService } from '../services/handle-errors.service';
import { DaysBetween } from './model/daysbetween.model';
import { YearRequest } from './model/yearrequest.model';
import { YearBetween } from './model/yearbetween.model';
import { DaysRate } from './model/daysrate.model';

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
      .post<DaysBetween[]>(`${API_URL}/${API_VERSION}/users/${username}/stat/days/daysbetween`, resource)
      .catch(this.handleErrorService.handleError);
  }

  daysMonthAvgRateDayByYear(username: string, resource: YearRequest) {
    console.log(">>>>>>>>>>>>>> YearRequest >>>>>>>>>>>>>>" + resource);
    return this.http
      .post<DaysRate[]>(`${API_URL}/${API_VERSION}/users/${username}/stat/days/monthavgdaybyyear`, resource)
      .catch(this.handleErrorService.handleError);
  }
}
