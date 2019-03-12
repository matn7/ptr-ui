import { Injectable } from "@angular/core";
import { HandleErrorsService } from "../handle-errors.service";
import { AppInternalMessagesService } from "./app-internal-messages.service";

@Injectable({
  providedIn: "root"
})
export class CustomErrorMessageService {
  errorMessage: string;

  constructor(
    private handleError: HandleErrorsService,
    private appInternalMessageService: AppInternalMessagesService
  ) {}

  displayMessage(error, returnUrl) {
    this.errorMessage = this.handleError.displayErrorMessage(
      error.errorStatus,
      error.errorMsg,
      returnUrl
    );
    this.appInternalMessageService.triggerMsgFromBackend(this.errorMessage);
  }

  displayDayMessage(error, year, month, day, returnUrl) {
    this.errorMessage = this.handleError.displayDayErrorMessage(
      error.errorStatus,
      year, month, day,
      returnUrl
    );
    this.appInternalMessageService.triggerMsgFromBackend(this.errorMessage);
  }
}
