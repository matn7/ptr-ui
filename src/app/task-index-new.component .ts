import { Component, OnInit, HostListener, Input } from "@angular/core";
import { ImportantIndex, ImportantIndexClass, ImportantService } from "./services/important.service.";
import { YELLOW_COMPLETION_STYLES, GREEN_COMPLETION_STYLES, BLUE_COMPLETION_STYLES } from "./app.constants";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { TimeService } from "./services/data/time.service";
import { Route } from "@angular/compiler/src/core";
import { CustomErrorMessageService } from "./services/data/custom-error-message.service";
import { WeekDay } from "@angular/common";
import { TaskServiceInterface } from "./services/task.service-interface";
import { IndexClassInterface } from "./services/index-class-interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";

export abstract class TaskIndexNewComponent implements OnInit {
  @Input() index: number = 0;

  selectDate: FormGroup;
  username: string;
  indexData: IndexClassInterface[];
  indexDataFinal: IndexClassInterface[] = [];
  // indexDataFinal: ImportantIndexClass[] = [];
  // indexDataFinal: IndexClassInterface[] = [];
  // oneObject: ImportantIndexClass;
  // oneObject: IndexClassInterface;
  month: number;
  year: number;
  returnUrl: string;
  numbers: Array<number>;
  weekDayArr: Array<string>;
  daysInMonth: number;
  firstElement: number;
  indexElement: number = 0;
  today: number;
  date: Date;
  target: string;

  readonly yellow_completion_styles = YELLOW_COMPLETION_STYLES;
  readonly green_completion_styles = GREEN_COMPLETION_STYLES;
  readonly blue_completion_styles = BLUE_COMPLETION_STYLES;

  constructor(
    private route: ActivatedRoute,
    private taskServiceInterface: TaskServiceInterface, 
    private authService: AuthenticationService,
    private timeService: TimeService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService,
    target: string,
    indexData: IndexClassInterface[]
    ) { 
      this.target = target;
      this.indexData = indexData;
    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i + 1);

    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
    );

    this.today = new Date().getDay();
    this.date = new Date();

    this.today = this.timeService.getActiveDay(
      this.month,
      this.year,
      this.date
    );

    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

    this.taskServiceInterface
      .getTaskIndexData(this.username, this.target, this.year, this.month)
      .subscribe(
        (data) => {
          this.indexData = data;
          console.log("===========================================");
          console.log(this.indexData);
          this.processData();
        }
    );

    this.initForm();
  }

  abstract processData();

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;

    // clear index data
    this.indexDataFinal = null;

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

    this.taskServiceInterface
      .getTaskIndexData(this.username, this.target, this.year, this.month)
      .subscribe(
        data => {
          this.processData();
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/" + this.target + "/" + this.year + "/" + this.month]);
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
    ], {replaceUrl: false});
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
