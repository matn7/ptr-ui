import { Component, OnInit, HostBinding } from "@angular/core";
import { ErrorMessagesService } from "../../services/data/error-messages.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html"
})
export class MessageComponent implements OnInit {
  errorMessage: string;

  @HostBinding("class.is-open")
  isDateInFutureMsg = false;

  @HostBinding("class.is-open")
  isMsgFromBackend = false;

  @HostBinding("class.is-open")
  isHeaderClicked = false;

  constructor(
    private errorMessageService: ErrorMessagesService
  ) {}

  ngOnInit() {
    this.errorMessageService.changeDateInFutureMsg.subscribe(isActive => {
      this.isDateInFutureMsg = isActive;
      this.errorMessage = "Date in future";
    });

    this.errorMessageService.changeMsgFromBackend.subscribe(isActive => {
      this.isMsgFromBackend = isActive.isMsg;
      this.errorMessage = isActive.msg;
    });

  }

  reset() {
    this.isDateInFutureMsg = false;
    this.isMsgFromBackend = false;
  }
}
