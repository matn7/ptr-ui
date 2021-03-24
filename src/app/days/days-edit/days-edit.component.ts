import { Component, OnInit, HostListener } from "@angular/core";
import { DaysService } from "../../services/days.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AuthenticationService } from "../../services/authentication.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { ErrorService } from "../../services/data/error.service";
import { TimeService } from "../../services/data/time.service";
import { START_DATE_PATTERN, POSTED_ON_PATTERN, DETAIL_DATE_FORMAT, DATE_FORMAT, MADE_CODES } from "../../app.constants";

@Component({
  selector: "app-days-edit",
  templateUrl: "./days-edit.component.html"
})
export class DaysEditComponent implements OnInit {

  editMode = false;
  username: string;
  id: number;
  date: Date;

  daysForm: FormGroup;
  
  startDate: string;
  postedOn: string;
  body: string;
  rateDay: number;
  day: number;
  month: number;
  year: number;
  errorMessage: string;
  returnUrl: string;

  readonly made_codes = MADE_CODES;

  constructor(
    private route: ActivatedRoute,
    private daysService: DaysService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private router: Router,
    private errorService: ErrorService,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService
  ) {}

  ngOnInit() {

    this.username = this.authService.getAuthenticatedUser();

    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });

    if (!this.editMode) {
      this.route.params.subscribe(
        params => {
          this.day = +params["day"];
          this.month = +params["month"];
          this.year = +params["year"];
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

      if (this.timeService.checkDateInFuture(this.year, this.month, this.day)) {
        this.redirectMsg();
        this.router.navigate([this.returnUrl]);
      }

      this.startDate = this.datepipe.transform(
        new Date(this.year, this.month - 1, this.day),
        START_DATE_PATTERN
      );
      this.postedOn = this.datepipe.transform(
        new Date(),
        POSTED_ON_PATTERN
      );
    }

    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;
    this.initForm(this.startDate, this.postedOn);
  }

  onSubmit() {
    if (this.editMode) {
      this.daysService
        .updateDays(this.username, this.id, this.daysForm.value)
        .subscribe(
          response => {
            this.router.navigate(["/days/" + +response["id"] + "/view"]);
          },
          error => {
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      this.daysService.createDays(this.username, this.daysForm.value).subscribe(
        response => {
          this.router.navigate(["/days/" + +response["id"] + "/view"]);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
    }
  }

  onDelete() {
    if (this.editMode && confirm("Press a button!\nEither OK or Cancel.")) {
      this.daysService.deleteDays(this.username, this.id).subscribe(
        response => {
          this.router.navigate(["/important/" + this.year + "/" + this.month]);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
    }
  }

  private redirectMsg() {
    this.appInternalMessageService.triggerDateInFutureMsg();
  }


  private initForm(startDate: string, postedOn: string) {
    const id = this.id;
    const body = this.body;
    const rateDay = this.rateDay;

    this.daysForm = new FormGroup({
      id: new FormControl(id),
      body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
      rateDay: new FormControl(rateDay, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required)
    });

    if (this.editMode) {
      this.daysService
        .getDays(this.username, this.id)
        .subscribe(
          days => {
            this.daysForm.setValue({
              "id": this.id,
              "body": days.body,
              "rateDay": this.made_codes[days.rateDay],
              "startDate": days.startDate,
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
