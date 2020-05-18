import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "../../services/statistics.important.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { TaskStatisticsComponent } from "../../task-statistics-component";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";

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
    handleError: HandleErrorsService,
    customErrorMsgService: CustomErrorMessageService,
    timeService: TimeService,
    appInternalMessageService: AppInternalMessagesService
  ) {
    super(route, router, statisticsTaskService, authService, handleError, customErrorMsgService, 
      timeService, appInternalMessageService, "lessimportant");
  }

}
