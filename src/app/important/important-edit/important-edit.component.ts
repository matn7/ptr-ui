import {
  Component,
  OnInit,
  Input,
  Output,
  HostBinding,
  HostListener
} from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ImportantService } from "../../services/important.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { TimeService } from "../../services/data/time.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-important-edit",
  templateUrl: "./important-edit.component.html",
  styleUrls: ["./important-edit.component.css"]
})
export class ImportantEditComponent implements OnInit {
  editMode = false;

  id: number;
  importantForm: FormGroup;
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
  today: number;
  selectedDate: Date;

  errorMessage: string;
  returnUrl: string;
  currentDayInMonth: number;
  changedInUrlDayInMonth: number;

  constructor(
    private route: ActivatedRoute,
    private importantService: ImportantService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private toggleService: ToggleService,
    private appInternalMessageService: AppInternalMessagesService,
    private timeService: TimeService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.userProfileId = this.username;

    this.selectedDate = new Date();

    this.returnUrl = "/important/" + this.year + "/" + this.month;

    // parameters from url
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.num = +params["num"];
    });
    if (!this.editMode) {
      console.log("TTT");
      this.route.params.subscribe(params => {
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
      });
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
      this.importantService
        .updateImportantTask(
          this.username,
          this.num,
          this.id,
          this.importantForm.value
        )
        .subscribe(
          response => {
            this.router.navigate([
              "/important/" + this.num + "/" + response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      this.importantService
        .createImportantTask(this.username, this.num, this.importantForm.value)
        .subscribe(
          response => {
            this.router.navigate([
              "/important/" + this.num + "/" + response["id"] + "/view"
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
      this.importantService
        .deleteImportantTask(this.username, this.num, this.id)
        .subscribe(
          response => {
            this.router.navigate([
              "/important/" + this.year + "/" + this.month
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
      this.importantService
        .getImportantTask(this.username, this.num, this.id)
        .subscribe(
          important => {
            this.importantForm.get("id").setValue(important.id);
            this.importantForm.get("title").setValue(important.title);
            this.importantForm.get("body").setValue(important.body);
            this.importantForm.get("made").setValue(important.made);
            this.importantForm.get("startDate").setValue(important.startDate);
            this.importantForm
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

    this.importantForm = new FormGroup({
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
