import {
  Component
} from "@angular/core";
import { TaskEditComponent } from "../../task-edit.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../../services/authentication.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { TimeService } from "../../services/data/time.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-important-edit",
  templateUrl: "./important-edit.component.html"
})
export class ImportantEditComponent extends TaskEditComponent {

  constructor(
    route: ActivatedRoute,
    TaskService: TaskService,
    datepipe: DatePipe,
    authService: AuthenticationService,
    router: Router,
    appInternalMessageService: AppInternalMessagesService,
    timeService: TimeService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, TaskService, datepipe, authService, router, appInternalMessageService,
    timeService, customErrorMsgService, "important");
  }


}
