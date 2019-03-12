import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExtraordinaryService } from "../../services/extraordinary.service";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-extraordinary-detail",
  templateUrl: "./extraordinary-detail.component.html",
  styleUrls: ["./extraordinary-detail.component.css"]
})
export class ExtraordinaryDetailComponent implements OnInit {
  id: number;
  username: string;

  errorMessage: string;
  date: Date;
  month: number;
  year: number;
  returnUrl: string;

  extraordinary: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private service: ExtraordinaryService,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/important/" + this.year + "/" + this.month;
    this.extraordinary = this.service
      .getExtraordinaryByid(this.username, this.id)
      .subscribe(
        extra => {
          this.extraordinary = extra;
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleDays();
  }
}
