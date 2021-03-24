import {
  OnInit
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { TaskService } from "./services/task.service";
import { AuthenticationService } from "./services/authentication.service";
import { TimeService } from "./services/data/time.service";
import { ErrorService } from "./services/data/error.service";
import { MADE_CODES, TITLE_LENGTH_VALIDATOR, TITLE_REQUIRED_VALIDATOR, 
  BODY_LENGTH_VALIDATOR, BODY_REQUIRED_VALIDATOR, DETAIL_DATE_FORMAT, DATE_FORMAT } from "./app.constants";

export class TaskEditComponent implements OnInit {
  // One window for create new and edit
  editMode = false;

  // Task data fields
  id: number;
  title: string;
  body: string;
  made: number;
  importantForm: FormGroup;
  date: Date;
  username: string;
  startDate: string;
  postedOn: string;

  // Task number fields number [1,2,3], target [important, lessimportant] 
  num: number;
  target: string;

  // Calendar data
  day: number;
  month: number;
  year: number;
  today: number;
  selectedDate: Date;
  returnUrl: string;

  // Constants to display in UI
  readonly made_codes = MADE_CODES;
  readonly title_length_validator = TITLE_LENGTH_VALIDATOR;
  readonly title_required_validator = TITLE_REQUIRED_VALIDATOR;
  readonly body_length_validator = BODY_LENGTH_VALIDATOR;
  readonly body_required_validator = BODY_REQUIRED_VALIDATOR;


  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private router: Router,
    private timeService: TimeService,
    private errorService: ErrorService,
    target: string
  ) {
    this.target = target;
  }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.selectedDate = new Date();

    this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

    // Retrieve url parameters
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
        this.errorService.displayMessage(error, this.returnUrl);
      });

      // Check for invalid date
      if (this.timeService.checkDateInFuture(this.year, this.month, this.day)) {
        this.errorService.dateInFutureMessage();
        this.router.navigate([this.returnUrl]);
      }
    }
    // Initialize hidden form fields
    this.initForm(this.startDate, this.postedOn);
  }

  onSubmit() {
    if (this.editMode) {
      // Edit
      this.taskService
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
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      // New
      this.taskService
        .createTask(this.username, this.target, this.num, this.importantForm.value)
        .subscribe(
          response => {
            this.router.navigate([
              "/" + this.target + "/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  onDelete() {
    if (this.editMode && confirm("Press a button!\nEither OK or Cancel.")) {
      this.taskService
        .deleteTask(this.username, this.target, this.num, this.id)
        .subscribe(
          response => {
            this.router.navigate([
              "/" + this.target + "/" + this.year + "/" + this.month
            ]);
          },
          error => {
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  private initForm(startDate: string, postedOn: string) {
    const id = this.id;
    const title = this.title;
    const body = this.body;
    const made = this.made;

    // Create form with Validators
    this.importantForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [Validators.required, Validators.maxLength(40)]),
      body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
      made: new FormControl(made, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required)
    });

    if (this.editMode) {
      this.taskService
        .getTask(this.username, this.target, this.num, this.id)
        .subscribe(
          important => {
            this.importantForm.setValue({
              "id": this.id,
              "title": important.title,
              "body": important.body,
              "made": this.made_codes[important.made],
              "startDate": important.startDate,
              "postedOn": this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT)
            });
          },
          error => {
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );

      this.startDate = this.datepipe.transform(new Date(), DATE_FORMAT);
      this.postedOn = this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT);
    }
  }
}
