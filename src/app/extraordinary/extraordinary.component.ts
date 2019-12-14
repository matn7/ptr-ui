import { Component, OnInit, HostListener, Inject, InjectionToken } from "@angular/core";
import { ToggleService } from "../services/data/toggle.service";
import { ExtraordinaryService } from "../services/extraordinary.service";
import { AuthenticationService } from "../services/authentication.service";
import { Extraordinary } from "./extraordinary.model";
import { HandleErrorsService } from "../services/handle-errors.service";
import { Router } from "@angular/router";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../services/data/custom-error-message.service";
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: "app-extraordinary",
  templateUrl: "./extraordinary.component.html",
  styleUrls: ["./extraordinary.component.css"]
})
export class ExtraordinaryComponent implements OnInit {
  username: string;
  extraordinaryData: Extraordinary[];
  errorNumber: number;
  errorMessage: string;
  returnUrl: string;
  records: Array<number>;

  constructor(
    private toggleService: ToggleService,
    private extraService: ExtraordinaryService,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    console.log("Data", data);
  }

  ngOnInit() {
    this.toggle();
    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/extraordinary/all";
    this.extraService.getExtraordinaryAll(this.username).subscribe(
      data => {
        console.log(data);
        this.extraordinaryData = data;
        this.records = Array(this.extraordinaryData.length)
          .fill(0)
          .map((x, i) => i);
      },
      error => {
        this.customErrorMsgService.displayMessage(error, this.returnUrl);
      }
    );
  }

  onView(id: number) {
    this.router.navigate(["/extraordinary/" + id + "/edit"]);
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleDays();
  }
}
