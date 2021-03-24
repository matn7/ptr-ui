import { Component, OnInit } from "@angular/core";
import { DaysService } from "../services/days.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { ErrorService } from "../services/data/error.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "days",
  templateUrl: "./days.component.html",
  styleUrls: ["./days.component.css"]
})
export class DaysComponent implements OnInit {
  days: any;
  username: string;
  errorMessage: string;
  errorNumber: number;
  isError = false;

  selectDate: FormGroup;
  day: number;
  month: number;
  year: number;

  daysInMonth: number;
  numbers: Array<number>;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private service: DaysService,
    private router: Router,
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.day = +params["day"];
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);

    this.initForm();

    this.returnUrl = "/days/" + this.year + "/" + this.month + "/" + this.day;

    this.days = this.service
      .getDaysByYearMonthDay(this.username, this.year, this.month, this.day)
      .subscribe(
        days => {
          this.errorMessage = "";
          this.days = days;
        },
        error => {
          this.errorService.displayMessage(
            error,
            this.returnUrl
          );
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;
    this.day = this.selectDate.value.selectDay;

    this.router.navigate([
      "/days/" + this.year + "/" + this.month + "/" + this.day
    ]);

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);

    this.days = this.service
      .getDaysByYearMonthDay(this.username, this.year, this.month, this.day)
      .subscribe(
        days => {
          this.errorMessage = "";
          this.days = days;
        },
        error => {
          this.errorService.displayMessage(
            error,
            this.returnUrl
          );
        }
      );
  }

  private initForm() {
    const selectYear = this.year;
    const selectMonth = this.month;
    const selectDay = this.day;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectMonth: new FormControl(selectMonth, Validators.required),
      selectDay: new FormControl(selectDay, Validators.required)
    });
  }
}
