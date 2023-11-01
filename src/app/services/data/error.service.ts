import { Injectable } from "@angular/core";
import { HandleErrorsService } from "../handle-errors.service";
import { MessagesService } from "./messages.service";

@Injectable({
    providedIn: "root"
})
export class ErrorService {
    errorMessage: string;
    errorMessages: string[];

    constructor(
        private handleError: HandleErrorsService,
        private messagesService: MessagesService
    ) { }

    displayMessage(error, returnUrl) {
        this.errorMessages = this.handleError.displayErrorMessage(
            error.errorStatus,
            error.errorMsg,
            returnUrl
        );
        console.log("displayMessage in ErrorService");
        console.log(JSON.stringify(this.errorMessages));

        this.messagesService.triggerMsgsFromBackend(this.errorMessages);
    }

}
