import { Component } from "@angular/core";
import { TaskDetailComponent } from "../../task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { MessagesService } from "src/app/services/data/messages.service";

@Component({
    selector: "app-less-important-detail",
    templateUrl: "./less-important-detail.component.html"
})
export class LessImportantDetailComponent extends TaskDetailComponent {

    constructor(
        route: ActivatedRoute,
        service: TaskService,
        authService: AuthenticationService,
        messagesService: MessagesService
    ) {
        super(route, service, authService, messagesService);
        this.setTarget("lessimportant");
    }

}
