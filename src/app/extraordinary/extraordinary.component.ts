import { Component, OnInit, HostListener } from "@angular/core";
import { ToggleService } from "../services/data/toggle.service";
import { ExtraordinaryService } from "../services/extraordinary.service";
import { AuthenticationService } from "../services/authentication.service";
import { Extraordinary } from "./extraordinary.model";
import { HandleErrorsService } from "../services/handle-errors.service";
import { Router } from "@angular/router";
import { AppInternalMessagesService } from "../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../services/data/custom-error-message.service";

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
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();
    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/extraordinary/all";
    this.extraService.getExtraordinaryAll(this.username).subscribe(
      data => {
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
