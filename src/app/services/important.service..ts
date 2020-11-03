import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "./handle-errors.service";
import { Index } from "../index.model.";

export class ImportantIndexClass {
  _daysDTO: DaysDTO;
  _extraordinaryDTO: ExtraordinaryDTO;

  set daysDTO(daysDTO: DaysDTO) {
    this._daysDTO = daysDTO;
  }

  set extraordinaryDTO(extraordinaryDTO: ExtraordinaryDTO) {
    this._extraordinaryDTO = extraordinaryDTO;
  }

  get daysDTO() {
    return this._daysDTO;
  }

  get extraordinaryDTO() {
    return this._extraordinaryDTO;
  }

}

export interface ImportantIndex {
  daysDTO: DaysDTO;
  extraordinaryDTO: ExtraordinaryDTO;
}

export interface DaysDTO {
  id: number;
  body: string;
  rateDay: number;
  startDate: number[];
  postedOn: number[];
}

export interface ExtraordinaryDTO {
  id: number;
  title: string;
  body: string;
}

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

  getTaskIndexData(username, target, year, month) {
    return this.http.get<ImportantIndex[]>(
      `${API_URL}/${API_VERSION}/users/${username}/${target}/new/${year}/${month}`
    );
  }
}
