import { Injectable, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HandleErrorsService } from "../handle-errors.service";

@Injectable({
    providedIn: "root"
})
export class MessagesService {
    isDateInFutureMsg: boolean;
    isMsgFromBackend: boolean;

    @Output()
    changeUiMessages: EventEmitter<{ msgs: string[] }> = new EventEmitter();

    @Output()
    changeDateInFutureMsg: EventEmitter<boolean> = new EventEmitter();

    // @Output()
    // changeMsgsFromBackend: EventEmitter<{ msgs: string }> = new EventEmitter();

    @Output()
    changeMsgsFromBackend: EventEmitter<{ msgs: string[] }> = new EventEmitter();

    constructor(
        private handleError: HandleErrorsService
    ) { }

    displayError(error, formGroup: FormGroup) {
        console.log("MessageService displayError method");
        this.triggerMsgsFromBackend(
            error.errorMsg['errorMessages']
        );
        for (let field of error.errorMsg['affectedFields']) {
            formGroup.controls[field].setErrors({ 'incorrect': true });
        }
    }

    displayErrorWithReturnUrl(error, returnUrl: string) {
        console.log("MessageService displayErrorWithReturnUrl method");
        this.handleError.displayErrorMessage(
            error.errorStatus,
            error.errorMsg,
            returnUrl
        );
        this.triggerMsgsFromBackend(
            error.errorMsg['errorMessages']
        );
    }

    emitUiMessage(messages: string[]) {
        this.changeUiMessages.emit({
            msgs: messages
        });
    }

    triggerDateInFutureMsg() {
        this.isDateInFutureMsg = true;
        this.changeDateInFutureMsg.emit(this.isDateInFutureMsg);
    }

    triggerMsgsFromBackend(messages: string[]) {
        console.log("---> " + JSON.stringify(messages));
        this.isMsgFromBackend = true;
        this.changeMsgsFromBackend.emit({
            msgs: messages
        });
    }
}
