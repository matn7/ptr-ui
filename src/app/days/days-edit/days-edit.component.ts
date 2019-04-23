import { Component, OnInit, HostListener } from "@angular/core";
import { DaysService } from "../../services/days.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { TimeService } from "../../services/data/time.service";

@Component({
  selector: "app-days-edit",
  templateUrl: "./days-edit.component.html",
  styleUrls: ["./days-edit.component.css"]
})
export class DaysEditComponent implements OnInit {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: any;

  days: any;
  id: number;
  username: string;
  date: Date;

  daysForm: FormGroup;

  startDate: string;
  postedOn: string;
  userProfileId: string;
  day: number;
  month: number;
  year: number;

  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private daysService: DaysService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private router: Router,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService
  ) {}

  ngOnInit() {
    // set important route active
    this.toggle();

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
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

      this.startDate = this.datepipe.transform(
        new Date(this.year, this.month - 1, this.day),
        "yyyy-MM-dd"
      );
      this.postedOn = this.datepipe.transform(
        new Date(),
        "yyyy-MM-ddTHH:mm:ss"
      );

      if (this.timeService.checkDateInFuture(this.year, this.month, this.day)) {
        this.redirectMsg();
        this.router.navigate([this.returnUrl]);
      }
    }

    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.userProfileId = this.username;

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;
    
    this.initForm();
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
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      this.daysService.createDays(this.username, this.daysForm.value).subscribe(
        response => {
          this.router.navigate(["/days/" + +response["id"] + "/view"]);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
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
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    }
  }

  private redirectMsg() {
    this.appInternalMessageService.triggerDateInFutureMsg();
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleDays();
  }

  private initForm() {
    const id = "";
    const body = "";
    const rateDay = +"";
    const startDate = "";
    const postedOn = "";
    const userProfileId = "";

    if (this.editMode) {
      this.days = this.daysService.getDays(this.username, this.id).subscribe(
        days => {
          this.daysForm.get("id").setValue(days.id);
          this.daysForm.get("body").setValue(days.body);
          this.daysForm.get("rateDay").setValue(days.rateDay);
          this.daysForm.get("startDate").setValue(days.startDate);
          this.daysForm
            .get("postedOn")
            .setValue(
              this.datepipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss")
            );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

      this.startDate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
      this.postedOn = this.datepipe.transform(
        new Date(),
        "yyyy-MM-ddTHH:mm:ss"
      );
      this.userProfileId = this.username;
    }

    this.daysForm = new FormGroup({
      id: new FormControl(id),
      body: new FormControl(body, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      rateDay: new FormControl(rateDay, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required),
      userProfileId: new FormControl(userProfileId, Validators.required)
    });
  }
}
