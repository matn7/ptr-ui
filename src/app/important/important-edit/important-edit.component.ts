import {
  Component
} from "@angular/core";
import { TaskEditComponent } from "../../task-edit.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../../auth/authentication.service";
import { TimeService } from "../../services/data/time.service";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-important-edit",
  templateUrl: "./important-edit.component.html"
})
export class ImportantEditComponent extends TaskEditComponent {

  constructor(
    route: ActivatedRoute,
    taskService: TaskService,
    datepipe: DatePipe,
    authService: AuthenticationService,
    router: Router,
    timeService: TimeService,
    errorService: ErrorService
  ) {
    super(route, taskService, datepipe, authService, router,
    timeService, errorService, "important");
  }


}
