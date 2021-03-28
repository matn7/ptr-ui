import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, API_VERSION } from "../app.constants";
import { HandleErrorsService } from "../services/handle-errors.service";
import { TaskServiceInterface } from "../services/task.service-interface"
import { IndexData } from "../services/index-class-interface";

export class LessImportantIndexDayData {
  _extraordinaryDTO: ExtraordinaryDTO;
  _daysDTO: DaysDTO;
  _lessImportantDTO: LessImportantDTO;
  _lessImportant2DTO: LessImportant2DTO;
  _lessImportant3DTO: LessImportant3DTO;

  set extraordinaryDTO(extraordinaryDTO: ExtraordinaryDTO) {
    this._extraordinaryDTO = extraordinaryDTO;
  }

  set daysDTO(daysDTO: DaysDTO) {
    this._daysDTO = daysDTO;
  }

  set lessImportantDTO(lessImportantDTO: LessImportantDTO) {
    this._lessImportantDTO = lessImportantDTO;
  }

  set lessImportant2DTO(lessImportant2DTO: LessImportant2DTO) {
    this._lessImportant2DTO = lessImportant2DTO;
  }

  set lessImportant3DTO(lessImportant3DTO: LessImportant3DTO) {
    this._lessImportant3DTO = lessImportant3DTO;
  }

  get extraordinaryDTO() {
    return this._extraordinaryDTO;
  }

  get daysDTO() {
    return this._daysDTO;
  }

  get lessImportantDTO() {
    return this._lessImportantDTO;
  }

  get lessImportant2DTO() {
    return this._lessImportant2DTO;
  }

  get lessImportant3DTO() {
    return this._lessImportant3DTO;
  }
}

export class LessImportantIndex implements IndexData {
  extraordinaryDTO: ExtraordinaryDTO;
  daysDTO: DaysDTO;
  importantDTO: LessImportantDTO;
  important2DTO: LessImportant2DTO;
  important3DTO: LessImportant3DTO;

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

export interface LessImportantDTO {
  id: number;
  title: string;
  body: string;
  made: number;
  postedOn: number[];
  startDate: number[];
}

export interface LessImportant2DTO {
  id: number;
  title: string;
  body: string;
  made: number;
  postedOn: number[];
  startDate: number[];
}

export interface LessImportant3DTO {
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
export class LessImportantService implements TaskServiceInterface {
  month: number;
  year: number;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorsService
  ) {}

  getTaskIndexData(username: string, target: string, year: number, month: number) {
    return this.http.get<LessImportantIndex[]>(
      `${API_URL}/${API_VERSION}/users/${username}/${target}/${year}/${month}`
    );
  }
}
