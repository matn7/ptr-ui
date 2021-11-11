import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "../statistics.important.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { ErrorService } from "../../services/data/error.service";
import { TaskStatisticsComponent } from "../../task-statistics-component";
import { TimeService } from "../../services/data/time.service";

@Component({
  selector: 'app-statistics-lessimportant',
  templateUrl: './statistics-lessimportant.component.html'
})
export class StatisticsLessimportantComponent extends TaskStatisticsComponent {


  constructor(
    route: ActivatedRoute,
    router: Router,
    statisticsTaskService: StatisticsTaskService,
    authService: AuthenticationService,
    errorService: ErrorService,
    timeService: TimeService
  ) {
    super(route, router, statisticsTaskService, authService, errorService, 
      timeService);

      this.setTarget("lessimportant");
  }

}
