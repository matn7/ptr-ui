import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-important-detail",
  templateUrl: "./task-detail.component.html"
})
export class TaskDetailComponent implements OnInit {
  id: number;
  num: number;
  username: string;
  returnUrl: string;
  month: number;
  year: number;
  date: Date;
  errorMessage: string;
  target: string;

  important: any;

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private handleError: HandleErrorsService,
    private authService: AuthenticationService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.num = +params["num"];
      this.target = params["target"];
    });
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.returnUrl = "/important/" + this.year + "/" + this.month;
    this.important = this.service
      .getImportantTask(this.username, this.target, this.num, this.id)
      .subscribe(
        important => {
          this.important = important;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }
}
