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
    _taskDTO: TaskDTO;
    _task2DTO: TaskDTO;
    _task3DTO: TaskDTO;

    set extraordinaryDTO(extraordinaryDTO: ExtraordinaryDTO) {
        this._extraordinaryDTO = extraordinaryDTO;
    }

    set daysDTO(daysDTO: DaysDTO) {
        this._daysDTO = daysDTO;
    }

    set taskDTO(taskDTO: TaskDTO) {
        this._taskDTO = taskDTO;
    }

    set task2DTO(task2DTO: TaskDTO) {
        this._task2DTO = task2DTO;
    }

    set task3DTO(task3DTO: TaskDTO) {
        this._task3DTO = task3DTO;
    }

    get extraordinaryDTO() {
        return this._extraordinaryDTO;
    }

    get daysDTO() {
        return this._daysDTO;
    }

    get taskDTO() {
        return this._taskDTO;
    }

    get task2DTO() {
        return this._task2DTO;
    }

    get task3DTO() {
        return this._task3DTO;
    }
}

// Data Structure stored each table entry - displayed on INDEX page.
export class ImportantIndex implements IndexData {
    extraordinaryDTO: ExtraordinaryDTO;
    daysDTO: DaysDTO;
    taskDTO: TaskDTO;
    task2DTO: TaskDTO;
    task3DTO: TaskDTO;

    constructor() { }
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

export interface TaskDTO {
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
    ) { }

    getTaskIndexData(username: string, target: string, year: number, month: number) {
        console.log("ImportantService");
        return this.http.get<ImportantIndex[]>(
            `${API_URL}/${API_VERSION}/users/${username}/${target}/${year}/${month}`
        ).catch(this.handleErrorService.handleError);;
    }
}
