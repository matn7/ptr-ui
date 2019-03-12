import { Component, OnInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ExtraordinaryService } from "../../services/extraordinary.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-extraordinary-edit",
  templateUrl: "./extraordinary-edit.component.html",
  styleUrls: ["./extraordinary-edit.component.css"]
})
export class ExtraordinaryEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;
  editedItem: any;

  extraordinaryData: any;
  username: string;
  date: Date;

  id: number;
  extraordinaryForm: FormGroup;

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
    private extraordinaryService: ExtraordinaryService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
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
    }
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.userProfileId = this.username;

    this.returnUrl = "/important/" + this.year + "/" + this.month;
    this.initForm();
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleDays();
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
    if (this.editMode) {
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

  private initForm() {
    const id = "";
    const title = "";
    const body = "";
    const startDate = "";
    const postedOn = "";
    const userProfileId = "";

    if (this.editMode) {
      this.extraordinaryData = this.extraordinaryService
        .getExtraordinaryByid(this.username, this.id)
        .subscribe(
          extra => {
            this.extraordinaryForm.get("id").setValue(extra.id);
            this.extraordinaryForm.get("title").setValue(extra.title);
            this.extraordinaryForm.get("body").setValue(extra.body);
            this.extraordinaryForm.get("startDate").setValue(extra.startDate);
            this.extraordinaryForm
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
      this.userProfileId = this.userProfileId;
    }

    this.extraordinaryForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      body: new FormControl(body, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      startDate: new FormControl(startDate, Validators.required),
      postedOn: new FormControl(postedOn, Validators.required),
      userProfileId: new FormControl(userProfileId, Validators.required)
    });
  }
}
