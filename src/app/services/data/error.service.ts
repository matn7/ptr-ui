import { Injectable } from "@angular/core";
import { HandleErrorsService } from "../handle-errors.service";
import { ErrorMessagesService } from "./error-messages.service";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  errorMessage: string;

  constructor(
    private handleError: HandleErrorsService,
    private errorMessageService: ErrorMessagesService
  ) {}

  displayMessage(error, returnUrl) {
    this.errorMessage = this.handleError.displayErrorMessage(
      error.errorStatus,
      error.errorMsg,
      returnUrl
    );
    this.errorMessageService.triggerMsgFromBackend(this.errorMessage);
  }

  displayBackendMessage(message: string) {
    this.errorMessageService.triggerMsgFromBackend(message);
  }

  dateInFutureMessage() {
    this.errorMessageService.triggerDateInFutureMsg();
  }
}
