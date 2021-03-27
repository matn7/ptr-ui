import { Component } from "@angular/core";
import { TaskDetailComponent } from "../../task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-important-detail",
  templateUrl: "./important-detail.component.html"
})
export class ImportantDetailComponent extends TaskDetailComponent {

  constructor(
    route: ActivatedRoute,
    service: TaskService,
    authService: AuthenticationService,
    errorService: ErrorService
  ) {
    super(route, service, authService, errorService, "important");
  }

}
