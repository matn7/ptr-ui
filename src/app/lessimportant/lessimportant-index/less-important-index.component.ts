import { Component } from "@angular/core";
import { TaskIndexComponent } from "../../task-index.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AuthenticationService } from "../../services/authentication.service";
import { ToggleService } from "../../services/data/toggle.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-less-important-index",
  templateUrl: "./less-important-index.component.html"
})
export class LessImportantIndexComponent extends TaskIndexComponent {

  constructor(
    route: ActivatedRoute,
    router: Router,
    importantIndexService: TaskService,
    handleError: HandleErrorsService,
    authService: AuthenticationService,
    toggleService: ToggleService,
    timeService: TimeService,
    appInternalMessageService: AppInternalMessagesService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, router, importantIndexService, handleError, authService, toggleService, timeService, appInternalMessageService,
      customErrorMsgService, "lessimportant");

  }

}
