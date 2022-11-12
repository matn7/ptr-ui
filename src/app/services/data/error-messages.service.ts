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
  changeMsgFromBackend: EventEmitter<{isMsg: boolean, msg: string}> = new EventEmitter();

  constructor() {}

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

  triggerMsgFromBackendSwitchOff() {
    this.isMsgFromBackend = false;
    this.changeMsgFromBackend.emit({
      isMsg: this.isMsgFromBackend,
      msg: ""
    });
  }
}
