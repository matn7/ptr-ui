import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrorMessagesService {
    isDateInFutureMsg: boolean;
    isMsgFromBackend: boolean;

    @Output()
    changeDateInFutureMsg: EventEmitter<boolean> = new EventEmitter();

    @Output()
    changeMsgFromBackend: EventEmitter<{ isMsg: boolean, msg: string }> = new EventEmitter();

    @Output()
    changeMsgsFromBackend: EventEmitter<{ isMsg: boolean, msgs: string[], aflds: string[] }> = new EventEmitter();

    constructor() { }

    triggerDateInFutureMsg() {
        this.isDateInFutureMsg = true;
        this.changeDateInFutureMsg.emit(this.isDateInFutureMsg);
    }

    triggerDateInFutureMsgSwitchOff() {
        this.isDateInFutureMsg = false;
        this.changeDateInFutureMsg.emit(this.isDateInFutureMsg);
    }

    triggerMsgFromBackend(message) {
        this.isMsgFromBackend = true;
        this.changeMsgFromBackend.emit({
            isMsg: this.isMsgFromBackend,
            msg: message
        });
    }

    triggerMsgsFromBackend(messages: string[], affectedFields: string[]) {
        this.isMsgFromBackend = true;
        this.changeMsgsFromBackend.emit({
            isMsg: this.isMsgFromBackend,
            msgs: messages,
            aflds: affectedFields
        });
    }

    triggerMsgFromBackendSwitchOff() {
        this.isMsgFromBackend = false;
        this.changeMsgFromBackend.emit({
            isMsg: this.isMsgFromBackend,
            msg: ""
        });
    }
}
