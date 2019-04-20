import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_VERSION, API_URL } from '../../app.constants';
import { HandleErrorsService } from '../handle-errors.service';
import { User } from '../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient,
    private handleErrorService: HandleErrorsService) { }

  getAllUserDetails() {
    return this.http
      .get<User[]>(
        `${API_URL}/${API_VERSION}/admin/all`
      )
      .catch(this.handleErrorService.handleError);
  }
}
