import { Component, OnInit, HostListener, HostBinding } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekDay } from "@angular/common";
import { LessImportantService } from "../../services/lessimportant.service";
import { AuthenticationService } from "../../services/authentication.service";
import {
  HandleErrorsService,
  INTERNAL_APP_ERROR
} from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-lessimportant-index",
  templateUrl: "./lessimportant-index.component.html",
  styleUrls: ["./lessimportant-index.component.css"]
})
export class LessimportantIndexComponent implements OnInit {
  selectDate: FormGroup;
  month: number;
  year: number;
  daysInMonth: number;
  date: Date;
  today: number;
  monthDay: Array<number>;
  weekDayArr: Array<string>;
  lessImportantIndexData: any;
  username: string;

  returnUrl: string;
  errorMessage: string;

  @HostBinding("class.is-open")
  isDateInFutureMsg = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessImportantIndexService: LessImportantService,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    // sets less important route active
    this.toggle();

    // get authenticated user
    this.username = this.authService.getAuthenticatedUser();

    // read parameters from url
    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
    });

    // component route
    this.returnUrl = "/lessimportant/" + this.year + "/" + this.month;

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // todays day
    this.today = new Date().getDate();
    this.date = new Date();

    this.today = this.timeService.getActiveDay(
      this.month,
      this.year,
      this.date
    );

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    // retrieva data from endpoint
    this.lessImportantIndexService
      .getLessImportantIndexData(this.username, this.year, this.month)
      .subscribe(
        data => {
          this.lessImportantIndexData = data;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    // initialize reactive form
    this.initForm();
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.today = this.timeService.getActiveDay(
      this.month,
      this.year,
      this.date
    );

    this.lessImportantIndexService
      .getLessImportantIndexData(this.username, this.year, this.month)
      .subscribe(
        data => {
          this.lessImportantIndexData = data;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/lessimportant/" + this.year + "/" + this.month]);
  }

  // make sure less important element in header is active
  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleLessImportant();
  }

  onAddExtraordinaryClick(year, month, day) {
    this.router.navigate([
      "/extraordinary/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditExtraordinaryClick(id) {
    this.router.navigate(["/extraordinary/" + id + "/edit"]);
  }

  onAddNewClick(num, year, month, day) {
    this.router.navigate([
      "/lessimportant/" + num + "/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditClick(num, id) {
    this.router.navigate(["/lessimportant/" + num + "/" + id + "/edit"]);
  }

  onAddDayClick(year, month, day) {
    this.router.navigate(["/days/" + year + "/" + month + "/" + day + "/new"]);
  }

  onEditDayClick(id) {
    this.router.navigate(["/days/" + id + "/edit"]);
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
