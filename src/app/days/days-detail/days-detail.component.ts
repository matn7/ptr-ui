import { Component, OnInit, Input, HostListener } from "@angular/core";
import { DaysService } from "src/app/services/days.service";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { Days } from "../days.model";

@Component({
  selector: "app-days-detail",
  templateUrl: "./days-detail.component.html"
})
export class DaysDetailComponent implements OnInit {
  id: number;
  username: string;
  days: Days;

  date: Date;
  day: number;
  month: number;
  year: number;

  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private service: DaysService,
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    // set important route active
    // this.days = new DaysModel();

    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.day = this.date.getDay();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;

    this.service.getDays(this.username, this.id).subscribe(
      values => {
        console.log(values.id);
        this.days = new Days(values.id, values.body, values.rateDay, values.postedOn, values.startDate, values.userProfileId);
      },
      error => {
        this.customErrorMsgService.displayMessage(error, this.returnUrl);
      }
    );
  }

  @HostListener("click")
  private toggle() {
    this.toggleService.toggleDays();
  }
}
