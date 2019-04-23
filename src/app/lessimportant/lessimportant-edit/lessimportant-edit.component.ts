import { Component, OnInit, HostListener } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { LessImportantService } from "../../services/lessimportant.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { TimeService } from "../../services/data/time.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-lessimportant-edit",
  templateUrl: "./lessimportant-edit.component.html",
  styleUrls: ["./lessimportant-edit.component.css"]
})
export class LessimportantEditComponent implements OnInit {
  editMode = false;

  id: number;
  lessImportantForm: FormGroup;
  num: number;

  date: Date;
  username: string;
  startDate: string;
  postedOn: string;
  // todo maybe to delete
  userProfileId: string;
  day: number;
  month: number;
  year: number;

  errorMessage: string;
  returnUrl: string;
  currentDayInMonth: number;
  changedInUrlDayInMonth: number;

  constructor(
    private route: ActivatedRoute,
    private lessImportantService: LessImportantService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private timeService: TimeService,
    private appInternalMessageService: AppInternalMessagesService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.userProfileId = this.username;

    this.returnUrl = "/lessimportant/" + this.year + "/" + this.month;

    // parameters from url
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.num = +params["num"];
    });

    if (!this.editMode) {
      this.route.params.subscribe(
        params => {
          this.day = +params["day"];
          this.month = +params["month"];
          this.year = +params["year"];
          this.startDate = this.datepipe.transform(
            new Date(this.year, this.month - 1, this.day),
            "yyyy-MM-dd"
          );
          this.postedOn = this.datepipe.transform(
            new Date(),
            "yyyy-MM-ddTHH:mm:ss"
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
      if (this.timeService.checkDateInFuture(this.year, this.month, this.day)) {
        this.redirectMsg();
        this.router.navigate([this.returnUrl]);
      }
    }
    this.initForm();
  }

  private redirectMsg() {
    this.appInternalMessageService.triggerDateInFutureMsg();
  }

  onSubmit() {
    if (this.editMode) {
      this.lessImportantService
        .updateLessImportantTask(
          this.username,
          this.num,
          this.id,
          this.lessImportantForm.value
        )
        .subscribe(
          response => {
            this.router.navigate([
              "/lessimportant/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      this.lessImportantService
        .createLessImportantTask(
          this.username,
          this.num,
          this.lessImportantForm.value
        )
        .subscribe(
          response => {
            this.router.navigate([
              "/lessimportant/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  onDelete() {
    if (this.editMode && confirm("Press a button!\nEither OK or Cancel.")) {
      this.lessImportantService
        .deleteLessImportantTask(this.username, this.num, this.id)
        .subscribe(
          response => {
            this.router.navigate([
              "/lessimportant/" + this.year + "/" + this.month
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    }
  }

  private initForm() {
    const id = "";
    const title = "";
    const body = "";
    const made = +"";
    const startDate = "";
    const postedOn = "";
    const userProfileId = "";

    if (this.editMode) {
      this.lessImportantService
        .getLessImportantTask(this.username, this.num, this.id)
        .subscribe(
          lessImportant => {
            this.lessImportantForm.get("id").setValue(lessImportant.id);
            this.lessImportantForm.get("title").setValue(lessImportant.title);
            this.lessImportantForm.get("body").setValue(lessImportant.body);
            this.lessImportantForm.get("made").setValue(lessImportant.made);
            this.lessImportantForm
              .get("startDate")
              .setValue(lessImportant.startDate);
            this.lessImportantForm
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
    }

    this.lessImportantForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      body: new FormControl(body, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      made: new FormControl(made, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required),
      userProfileId: new FormControl(userProfileId, Validators.required)
    });
  }
}
