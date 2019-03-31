import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LessImportantService } from "../../services/lessimportant.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-lessimportant-detail",
  templateUrl: "./lessimportant-detail.component.html",
  styleUrls: ["./lessimportant-detail.component.css"]
})
export class LessimportantDetailComponent implements OnInit {
  id: number;
  num: number;
  username: string;
  errorMessage: string;

  lessImportant: any;
  returnUrl: string;
  year: number;
  month: number;
  date: Date;

  constructor(
    private route: ActivatedRoute,
    private service: LessImportantService,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.num = +params["num"];
    });

    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.returnUrl = "/lessimportant/" + this.year + "/" + this.month;
    this.service
      .getLessImportantTask(this.username, this.num, this.id)
      .subscribe(
        lessImportant => {
          this.lessImportant = lessImportant;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }
}
