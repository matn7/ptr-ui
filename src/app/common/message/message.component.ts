import { Component, OnInit, HostBinding } from "@angular/core";
import { MessagesService } from "../../services/data/messages.service";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html"
})
export class MessageComponent implements OnInit {
    errorMessage: string;
    messages: string[];

    @HostBinding("class.is-open")
    displayMessage = false;

    constructor(
        private messagesService: MessagesService
    ) { }

    ngOnInit() {
        this.messagesService.changeUiMessages.subscribe(message => {
            console.log("changeUiMessages");
            this.displayMessage = true;
            this.messages = message.msgs
        });

        this.messagesService.changeDateInFutureMsg.subscribe(isActive => {
            console.log("changeDateInFutureMsg");
            this.displayMessage = true;
            this.messages = ["Date in future"];
            console.log("error message: " + this.errorMessage);
            console.log("display message: " + this.displayMessage);
        });

        this.messagesService.changeMsgsFromBackend.subscribe(message => {
            console.log("changeMsgsFromBackend v2");
            console.log(JSON.stringify(message));
            this.displayMessage = true;
            // this.messages.push(message["msgs"]);
            this.messages = message.msgs;
            console.log("-----> " + this.messages);
        });
    }

    reset() {
        this.displayMessage = false;
    }
}
