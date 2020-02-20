import {
  Component,
  OnInit,
  HostListener
} from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { TaskService } from "./services/task.service";
import { AuthenticationService } from "./services/authentication.service";
import { HandleErrorsService } from "./services/handle-errors.service";
import { ToggleService } from "./services/data/toggle.service";
import { AppInternalMessagesService } from "./services/data/app-internal-messages.service";
import { TimeService } from "./services/data/time.service";
import { CustomErrorMessageService } from "./services/data/custom-error-message.service";
import { MADE_CODES, TITLE_LENGTH_VALIDATOR, TITLE_REQUIRED_VALIDATOR, 
  BODY_LENGTH_VALIDATOR, BODY_REQUIRED_VALIDATOR, DETAIL_DATE_FORMAT, DATE_FORMAT } from "./app.constants";

export class TaskEditComponent implements OnInit {
  editMode = false;

  id: number;
  title: string;
  body: string;
  made: number;
  readonly made_codes = MADE_CODES;
  readonly title_length_validator = TITLE_LENGTH_VALIDATOR;
  readonly title_required_validator = TITLE_REQUIRED_VALIDATOR;
  readonly body_length_validator = BODY_LENGTH_VALIDATOR;
  readonly body_required_validator = BODY_REQUIRED_VALIDATOR;

  importantForm: FormGroup;
  num: number;
  target: string;

  date: Date;
  username: string;
  startDate: string;
  postedOn: string;
  // todo maybe to delete
  userProfileId: string;
  day: number;
  month: number;
  year: number;
  today: number;
  selectedDate: Date;

  errorMessage: string;
  returnUrl: string;
  currentDayInMonth: number;
  changedInUrlDayInMonth: number;

  constructor(
    private route: ActivatedRoute,
    private TaskService: TaskService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private toggleService: ToggleService,
    private appInternalMessageService: AppInternalMessagesService,
    private timeService: TimeService,
    private customErrorMsgService: CustomErrorMessageService,
    target: string
  ) {
    this.target = target;
  }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.userProfileId = this.username;

    this.selectedDate = new Date();

    this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

    // parameters from url
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.num = +params["num"];
    });
    if (!this.editMode) {
      this.route.params.subscribe(params => {
        this.day = +params["day"];
        this.month = +params["month"];
        this.year = +params["year"];
        this.startDate = this.datepipe.transform(new Date(this.year, this.month - 1, this.day), DATE_FORMAT);
        this.postedOn = this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT);
      },
      error => {
        this.customErrorMsgService.displayMessage(error, this.returnUrl);
      });
      if (this.timeService.checkDateInFuture(this.year, this.month, this.day)) {
        this.redirectMsg();
        this.router.navigate([this.returnUrl]);
      }
    }
    this.initForm(this.startDate, this.postedOn, this.username);
  }

  private redirectMsg() {
    this.appInternalMessageService.triggerDateInFutureMsg();
  }

  onSubmit() {
    if (this.editMode) {
      console.log("ID: " + this.id);
      this.TaskService
        .updateTask(
          this.username,
          this.target,
          this.num,
          this.id,
          this.importantForm.value
        )
        .subscribe(
          response => {
            this.router.navigate([
              "/" + this.target + "/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    } else {

      console.log("Co wysylamy: " + this.importantForm.value.made);

      this.TaskService
        .createTask(this.username, this.target, this.num, this.importantForm.value)
        .subscribe(
          response => {
            this.router.navigate([
              "/" + this.target + "/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleImportant();
  }

  onDelete() {
    if (this.editMode && confirm("Press a button!\nEither OK or Cancel.")) {
      this.TaskService
        .deleteTask(this.username, this.target, this.num, this.id)
        .subscribe(
          response => {
            this.router.navigate([
              "/" + this.target + "/" + this.year + "/" + this.month
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  private initForm(startDate: string, postedOn: string, username: string) {
    const id = this.id;
    const title = this.title;
    const body = this.body;
    const made = this.made;

    this.importantForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [Validators.required, Validators.maxLength(40)]),
      body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
      made: new FormControl(made, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required),
      userProfileId: new FormControl(username, Validators.required)
    });

    if (this.editMode) {
      this.TaskService
        .getTask(this.username, this.target, this.num, this.id)
        .subscribe(
          important => {
            this.importantForm.setValue({
              "id": this.id,
              "title": important.title,
              "body": important.body,
              "made": this.made_codes[important.made],
              "startDate": important.startDate,
              "postedOn": this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT),
              "userProfileId": this.username
            });
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );

      this.startDate = this.datepipe.transform(new Date(), DATE_FORMAT);
      this.postedOn = this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT);
      this.userProfileId = this.username;
    }
  }
}
