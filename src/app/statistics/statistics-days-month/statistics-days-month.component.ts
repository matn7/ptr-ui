import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DateRequest } from "../date-request";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StatisticsDaysService } from "../statistics-days.service";
import { ErrorService } from "../../services/data/error.service";
import { MONTH_NAMES, GREEN_COLORS } from "../../app.constants";
import { WeekDay } from "@angular/common";

@Component({
  selector: "app-statistics-days-month",
  templateUrl: "./statistics-days-month.component.html"
})
export class StatisticsDaysMonthComponent implements OnInit {
  username: string;
  year: number;
  month: number;
  title: string;
  returnUrl: string;
  dateRequest: DateRequest;
  selectDate: FormGroup;
  monthDay: Array<number>;
  daysInMonth: number;
  monthWeekDayArr: Array<string>;

  countMap: Map<string, number>;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private statisticsDaysService: StatisticsDaysService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.month = +params["month"];
    });

    this.countMap = new Map<string, number>();

    this.username = this.authService.getAuthenticatedUser();

    this.title = "Mood for " + this.year + " / " + MONTH_NAMES[this.month - 1];
    this.returnUrl = "/statistics/days/" + this.year + "/" + this.month;
    this.dateRequest = new DateRequest(this.year, this.month);

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.monthWeekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    console.log("********************>>> " + this.monthWeekDayArr);

    this.initForm();

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        dayMade => {
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
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
    this.monthWeekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        dayMade => {
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
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

