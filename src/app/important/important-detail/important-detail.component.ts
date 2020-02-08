import { Component, OnInit } from "@angular/core";
import { TaskDetailComponent } from "../../task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AuthenticationService } from "../../services/authentication.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-important-detail",
  templateUrl: "./important-detail.component.html"
})
export class ImportantDetailComponent extends TaskDetailComponent {

  constructor(
    route: ActivatedRoute,
    service: TaskService,
    handleError: HandleErrorsService,
    authService: AuthenticationService,
    appInternalMessageService: AppInternalMessagesService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, service, handleError, authService, appInternalMessageService, customErrorMsgService);
  }

}
