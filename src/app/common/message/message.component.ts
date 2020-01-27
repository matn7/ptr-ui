import { Component, OnInit, HostBinding } from "@angular/core";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { ToggleService } from "../../services/data/toggle.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
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
    private appInternalMessageService: AppInternalMessagesService,
    private toggleService: ToggleService
  ) {}

  ngOnInit() {
    this.appInternalMessageService.changeDateInFutureMsg.subscribe(isActive => {
      this.isDateInFutureMsg = isActive;
      this.errorMessage = "Date in future";
    });

    this.appInternalMessageService.changeMsgFromBackend.subscribe(isActive => {
      this.isMsgFromBackend = isActive.isMsg;
      this.errorMessage = isActive.msg;
    });

    this.toggleService.changeClickedHeader.subscribe(isActive => {
      this.reset();
    });
  }

  reset() {
    console.log("CLICKED");
    this.isDateInFutureMsg = false;
    this.isMsgFromBackend = false;
  }
}
