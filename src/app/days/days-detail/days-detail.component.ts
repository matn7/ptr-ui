import { Component, OnInit } from "@angular/core";
import { DaysService } from "src/app/services/days.service";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorService } from "../../services/data/error.service";
import { Days } from "../days.model";

@Component({
  selector: "app-days-detail",
  templateUrl: "./days-detail.component.html"
})
export class DaysDetailComponent implements OnInit {
  id: number;
  username: string;
  days: Days;

  date: Date;
  day: number;
  month: number;
  year: number;

  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private daysService: DaysService,
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    
    this.username = this.authService.getAuthenticatedUser();
    this.date = new Date();
    this.day = this.date.getDay();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;

    this.daysService.getDays(this.username, this.id).subscribe(
      values => {
        this.days = new Days(values.id, values.body, values.rateDay, values.postedOn, values.startDate);
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }
}
