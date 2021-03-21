import { Component, OnInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ExtraordinaryService } from "../../services/extraordinary.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { TITLE_LENGTH_VALIDATOR, TITLE_REQUIRED_VALIDATOR, BODY_LENGTH_VALIDATOR, BODY_REQUIRED_VALIDATOR, DETAIL_DATE_FORMAT, DATE_FORMAT } from "../../app.constants";

@Component({
  selector: "app-extraordinary-edit",
  templateUrl: "./extraordinary-edit.component.html"
})
export class ExtraordinaryEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;
  editedItem: any;

  extraordinaryData: any;
  username: string;
  date: Date;

  title: string;
  body: string;

  id: number;
  extraordinaryForm: FormGroup;

  startDate: string;
  postedOn: string;
  day: number;
  month: number;
  year: number;

  readonly title_length_validator = TITLE_LENGTH_VALIDATOR;
  readonly title_required_validator = TITLE_REQUIRED_VALIDATOR;
  readonly body_length_validator = BODY_LENGTH_VALIDATOR;
  readonly body_required_validator = BODY_REQUIRED_VALIDATOR;

  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private extraordinaryService: ExtraordinaryService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService
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
          this.startDate = this.datepipe.transform(
            new Date(this.year, this.month - 1, this.day),
            DATE_FORMAT
          );
          this.postedOn = this.datepipe.transform(
            new Date(),
            DETAIL_DATE_FORMAT
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    }
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/important/" + this.year + "/" + this.month;
    this.initForm(this.startDate, this.postedOn, this.username);

  }

  onSubmit() {
    if (this.editMode) {
      this.extraordinaryService
        .updateExtraordinary(
          this.username,
          this.id,
          this.extraordinaryForm.value
        )
        .subscribe(
          response => {
            this.router.navigate([
              "/extraordinary/" + +response["id"] + "/view"
            ]);
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );
    } else {
      this.extraordinaryService
        .createExtraordinary(this.username, this.extraordinaryForm.value)
        .subscribe(
          response => {
            this.router.navigate([
              "/extraordinary/" + +response["id"] + "/view"
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
      this.extraordinaryService
        .deleteExtraordinary(this.username, this.id)
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

  private initForm(startDate: string, postedOn: string, username: string) {
    const id = this.id;
    const title = this.title;
    const body = this.body;

    this.extraordinaryForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [Validators.required, Validators.maxLength(40)]),
      body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required)
    });

    if (this.editMode) {
      this.extraordinaryService
        .getExtraordinaryByid(this.username, this.id)
        .subscribe(
          important => {
            this.extraordinaryForm.setValue({
              "id": this.id,
              "title": important.title,
              "body": important.body,
              "startDate": important.startDate,
              "postedOn": this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT)
            });
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );

      this.startDate = this.datepipe.transform(new Date(), DATE_FORMAT);
      this.postedOn = this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT);
    }
  }
}
