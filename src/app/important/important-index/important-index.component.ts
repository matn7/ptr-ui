import { Component, OnInit, HostListener } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekDay } from "@angular/common";
import { ImportantService } from "../../services/important.service";
import { AuthenticationService } from "../../services/authentication.service";
import { Important } from "../important.model";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-important-index",
  templateUrl: "./important-index.component.html",
  styleUrls: ["./important-index.component.css"]
})
export class ImportantIndexComponent implements OnInit {
  selectDate: FormGroup;
  month: number;
  year: number;
  day: number;
  daysInMonth: number;
  date: Date;
  today: number;
  numbers: Array<number>;
  weekDayArr: Array<string>;
  importantIndexData: Important[];
  username: string;
  errorNumber: number;
  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private importantIndexService: ImportantService,
    private handleError: HandleErrorsService,
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    // set important route active
    this.toggle();

    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.returnUrl = "/important/" + this.year + "/" + this.month;

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
      .getImportantIndexData(this.username, this.year, this.month)
      .subscribe(
        data => {
          this.importantIndexData = data;
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
      .getImportantIndexData(this.username, this.year, this.month)
      .subscribe(
        data => {
          this.importantIndexData = data;
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

  onAddNewClick(num, year, month, day) {
    this.router.navigate([
      "/important/" + num + "/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditClick(num, id) {
    this.router.navigate(["/important/" + num + "/" + id + "/edit"]);
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
