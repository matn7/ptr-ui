import {
  Component
} from "@angular/core";
import { TaskEditComponent } from "../../task-edit.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { TimeService } from "../../services/data/time.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-less-important-edit",
  templateUrl: "./less-important-edit.component.html"
})
export class LessImportantEditComponent extends TaskEditComponent {

  isActive;

  constructor(
    route: ActivatedRoute,
    TaskService: TaskService,
    datepipe: DatePipe,
    authService: AuthenticationService,
    handleError: HandleErrorsService,
    router: Router,
    appInternalMessageService: AppInternalMessagesService,
    timeService: TimeService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, TaskService, datepipe, authService, handleError, router, appInternalMessageService,
    timeService, customErrorMsgService, "lessimportant");
    this.isActive = true;

  }


}
