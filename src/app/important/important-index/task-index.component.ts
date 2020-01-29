import { Component, OnInit, HostListener, Output, EventEmitter  } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { WeekDay } from "@angular/common";
import { TaskService } from "../../services/task.service";
import { AuthenticationService } from "../../services/authentication.service";
import { Important } from "../important.model";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { GREEN_COMPLETION_STYLES, YELLOW_COMPLETION_STYLES, BLUE_COMPLETION_STYLES } from "../../app.constants";

@Component({
  selector: "app-important-index",
  templateUrl: "./task-index.component.html"
})
export class TaskIndexComponent implements OnInit {
  selectDate: FormGroup;
  month: number;
  year: number;
  target: string;
  day: number;
  daysInMonth: number;
  date: Date;
  today: number;
  numbers: Array<number>;
  weekDayArr: Array<string>;
  taskIndexData: Important[];
  username: string;
  errorNumber: number;
  errorMessage: string;
  returnUrl: string;

  readonly green_completion_styles = GREEN_COMPLETION_STYLES;
  readonly yellow_completion_styles = YELLOW_COMPLETION_STYLES;
  readonly blue_completion_styles = BLUE_COMPLETION_STYLES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private importantIndexService: TaskService,
    private handleError: HandleErrorsService,
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        console.log("NAVIGATION");
        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    // set important route active
    this.toggle();

    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
      this.target = params["target"];
    });

    console.log("TARGET: " + this.target);

    this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.today = new Date().getDay();
    this.date = new Date();
    this.username = this.authService.getAuthenticatedUser();

    this.today = this.timeService.getActiveDay(
      this.month,
      this.year,
      this.date
    );

    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.importantIndexService
      .getTaskIndexData(this.username, this.target, this.year, this.month)
      .subscribe(
        data => {
          this.taskIndexData = data;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.initForm();
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;

    // clear index data
    this.taskIndexData = null;

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.numbers = Array(this.daysInMonth)
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

    this.importantIndexService
      .getTaskIndexData(this.username, this.target, this.year, this.month)
      .subscribe(
        data => {
          console.log(data);
          this.taskIndexData = data;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/important/" + this.year + "/" + this.month]);
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleImportant();
  }

  onAddExtraordinaryClick(year, month, day) {
    this.router.navigate([
      "/extraordinary/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditExtraordinaryClick(id) {
    this.router.navigate(["/extraordinary/" + id + "/edit"]);
  }

  onAddNewClick(target, num, year, month, day) {
    this.router.navigate([
      "/" + target + "/" + num + "/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditClick(target, num, id) {
    this.router.navigate(["/" + target + "/" + num + "/" + id + "/edit"]);
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
