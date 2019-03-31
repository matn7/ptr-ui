import { Component, OnInit, HostListener } from "@angular/core";
import { DaysService } from "../services/days.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { HandleErrorsService } from "../services/handle-errors.service";
import { ToggleService } from "../services/data/toggle.service";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../services/data/custom-error-message.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "days",
  templateUrl: "./days.component.html",
  styleUrls: ["./days.component.css"]
})
export class DaysComponent implements OnInit {
  days: any;
  username: string;
  errorMessage: string;
  errorNumber: number;
  isError = false;

  selectDate: FormGroup;
  day: number;
  month: number;
  year: number;

  daysInMonth: number;
  numbers: Array<number>;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private service: DaysService,
    private router: Router,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.day = +params["day"];
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);

    this.initForm();

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;

    this.days = this.service
      .getDaysByYearMonthDay(this.username, this.year, this.month, this.day)
      .subscribe(
        days => {
          this.errorMessage = "";
          this.days = days;
        },
        error => {
          this.customErrorMsgService.displayDayMessage(
            error,
            this.year,
            this.month,
            this.day,
            this.returnUrl
          );
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;
    this.day = this.selectDate.value.selectDay;

    this.router.navigate([
      "/days/" + this.year + "/" + this.month + "/" + this.day
    ]);

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);

    this.days = this.service
      .getDaysByYearMonthDay(this.username, this.year, this.month, this.day)
      .subscribe(
        days => {
          this.errorMessage = "";
          this.days = days;
        },
        error => {
          this.customErrorMsgService.displayDayMessage(
            error,
            this.year,
            this.month,
            this.day,
            this.returnUrl
          );
        }
      );
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleDays();
  }

  private initForm() {
    const selectYear = this.year;
    const selectMonth = this.month;
    const selectDay = this.day;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectMonth: new FormControl(selectMonth, Validators.required),
      selectDay: new FormControl(selectDay, Validators.required)
    });
  }
}
