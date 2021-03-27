import { Component } from "@angular/core";
import { TaskDetailComponent } from "../../task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { AuthenticationService } from "../../registration/authentication.service";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-less-important-detail",
  templateUrl: "./less-important-detail.component.html"
})
export class LessImportantDetailComponent extends TaskDetailComponent {

  constructor(
    route: ActivatedRoute,
    service: TaskService,
    authService: AuthenticationService,
    errorService: ErrorService
  ) {
    super(route, service, authService, errorService, "lessimportant");
  }

}
