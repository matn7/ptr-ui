import { Component } from "@angular/core";
import { TaskIndexComponent } from "../../task-index.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AuthenticationService } from "../../services/authentication.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { Task } from "src/app/task.model";
import { Index } from "src/app/index.model.";

@Component({
  selector: "app-important-index",
  templateUrl: "./important-index.component.html"
})
export class ImportantIndexComponent extends TaskIndexComponent {

  taskIndexData: Task[];

  constructor(
    route: ActivatedRoute,
    router: Router,
    importantIndexService: TaskService,
    handleError: HandleErrorsService,
    authService: AuthenticationService,
    timeService: TimeService,
    appInternalMessageService: AppInternalMessagesService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, router, importantIndexService, handleError, authService, timeService, appInternalMessageService,
      customErrorMsgService, "important");

  }

}
