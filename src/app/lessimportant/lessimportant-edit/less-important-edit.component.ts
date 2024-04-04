import {
    Component
} from "@angular/core";
import { TaskEditComponent } from "../../task-edit.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../../auth/authentication.service";
import { MessagesService } from "src/app/services/data/messages.service";
import { TimeService } from "src/app/services/data/time.service";

@Component({
    selector: "app-less-important-edit",
    templateUrl: "./less-important-edit.component.html"
})
export class LessImportantEditComponent extends TaskEditComponent {
    constructor(
        route: ActivatedRoute,
        taskService: TaskService,
        datepipe: DatePipe,
        authService: AuthenticationService,
        router: Router,
        timeService: TimeService,
        messagesService: MessagesService
    ) {
        super(route, taskService, datepipe, authService, router,
            timeService, messagesService);
        this.setTarget("lessimportant");
    }
}
