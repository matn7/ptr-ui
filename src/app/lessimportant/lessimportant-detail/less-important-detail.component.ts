import { Component } from "@angular/core";
import { TaskDetailComponent } from "../../task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { AuthenticationService } from "../../services/authentication.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-less-important-detail",
  templateUrl: "./less-important-detail.component.html"
})
export class LessImportantDetailComponent extends TaskDetailComponent {

  constructor(
    route: ActivatedRoute,
    service: TaskService,
    authService: AuthenticationService,
    customErrorMsgService: CustomErrorMessageService
  ) {
    super(route, service, authService, customErrorMsgService, "lessimportant");
  }

}
