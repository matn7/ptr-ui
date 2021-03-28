import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";
import { TaskServiceInterface } from "../services/task.service-interface";
import { IndexData } from "../services/index-class-interface";

// Data structure representing each day entry in INDEX page.
export class ImportantIndexDayData {
  _extraordinaryDTO: ExtraordinaryDTO;
  _daysDTO: DaysDTO;
  _importantDTO: ImportantDTO;
  _important2DTO: Important2DTO;
  _important3DTO: Important3DTO;

  set extraordinaryDTO(extraordinaryDTO: ExtraordinaryDTO) {
    this._extraordinaryDTO = extraordinaryDTO;
  }

  set daysDTO(daysDTO: DaysDTO) {
    this._daysDTO = daysDTO;
  }

  set importantDTO(importantDTO: ImportantDTO) {
    this._importantDTO = importantDTO;
  }

  set important2DTO(important2DTO: Important2DTO) {
    this._important2DTO = important2DTO;
  }

  set important3DTO(important3DTO: Important3DTO) {
    this._important3DTO = important3DTO;
  }

  get extraordinaryDTO() {
    return this._extraordinaryDTO;
  }

  get daysDTO() {
    return this._daysDTO;
  }

  get importantDTO() {
    return this._importantDTO;
  }

  get important2DTO() {
    return this._important2DTO;
  }

  get important3DTO() {
    return this._important3DTO;
  }
}

// Data Structure stored each table entry - displayed on INDEX page.
export class ImportantIndex implements IndexData {
  extraordinaryDTO: ExtraordinaryDTO;
  daysDTO: DaysDTO;
  importantDTO: ImportantDTO;
  important2DTO: Important2DTO;
  important3DTO: Important3DTO;

  constructor() {}
}

export interface ExtraordinaryDTO {
  id: number;
  title: string;
  body: string;
}

export interface DaysDTO {
  id: number;
  body: string;
  rateDay: number;
  startDate: number[];
  postedOn: number[];
}

export interface ImportantDTO {
  id: number;
  title: string;
  body: string;
  made: number;
  postedOn: number[];
  startDate: number[];
}

export interface Important2DTO {
  id: number;
  title: string;
  body: string;
  made: number;
  postedOn: number[];
  startDate: number[];
}

export interface Important3DTO {
  id: number;
  title: string;
  body: string;
  made: number;
  postedOn: number[];
  startDate: number[];
}

@Injectable({
  providedIn: "root"
})
export class ImportantService implements TaskServiceInterface {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getTaskIndexData(username: string, target: string, year: number, month: number) {
    return this.http.get<ImportantIndex[]>(
      `${API_URL}/${API_VERSION}/users/${username}/${target}/${year}/${month}`
    ).catch(this.handleErrorService.handleError);;
  }
}
