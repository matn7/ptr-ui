import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DateRequest } from "../date-request";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StatisticsDaysService } from "../../services/statistics-days.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { MONTH_NAMES, GREEN_COLORS } from "../../app.constants";
import { WeekDay } from "@angular/common";

@Component({
  selector: "app-statistics-days-month",
  templateUrl: "./statistics-days-month.component.html"
})
export class StatisticsDaysMonthComponent implements OnInit {
  username: string;
  green_colors: string[];
  month_names: string[];
  year: number;
  month: number;
  title: string;
  returnUrl: string;
  dateRequest: DateRequest;
  selectDate: FormGroup;
  daysTaskCount: any;
  daysMonthWeekdays: any;
  monthDay: Array<number>;
  daysInMonth: number;
  weekDayArr: Array<string>;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private statisticsDaysService: StatisticsDaysService,
    private customErrorMsgService: CustomErrorMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.month = +params["month"];
    });

    this.username = this.authService.getAuthenticatedUser();
    this.green_colors = GREEN_COLORS;

    this.title = "Mood for " + this.year + " / " + MONTH_NAMES[this.month - 1];
    this.returnUrl = "/statistics/days/" + this.year + "/" + this.month;
    this.dateRequest = new DateRequest(this.year, this.month);

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.initForm();

    this.statisticsDaysService
      .retrieveDaysByUsernameMonthAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.daysTaskCount = count;

        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        avg => {
          this.daysMonthWeekdays = avg;

        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;
    this.title = "Mood for " + this.year + " / " + MONTH_NAMES[this.month - 1];
    this.dateRequest.year = this.year;
    this.dateRequest.month = this.month;

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.statisticsDaysService
      .retrieveDaysByUsernameMonthAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.daysTaskCount = count;

        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        avg => {
          this.daysMonthWeekdays = avg;

        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/statistics/days/" + this.month + "/" + this.year]);
  }

  private initForm() {
    const selectYear = this.year;
    const selectMonth = this.month;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectMonth: new FormControl(selectMonth, Validators.required)
    });
  }
}
