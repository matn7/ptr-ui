import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsDaysService } from "../statistics-days.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { ErrorService } from "../../services/data/error.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DateRequest } from "../date-request";

@Component({
  selector: "app-statistics-days",
  templateUrl: "./statistics-days.component.html"
})
export class StatisticsDaysComponent implements OnInit {

  year: number;
  username: string;
  title: string;
  selectDate: FormGroup;
  returnUrl: string;

  dateRequest: DateRequest;

  averageMap: Map<string, number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsDaysService: StatisticsDaysService,
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
    });
    this.title = "Mood for " + this.year;
    this.returnUrl = "/statistics/days/" + this.year + "/";

    this.dateRequest = new DateRequest(this.year, 0);

    this.averageMap = new Map<string, number>();

    this.initForm();

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.populateAverageMap(avg);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.title = "Mood for " + this.year;
    this.dateRequest.year = this.year;
    this.averageMap.clear();

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.populateAverageMap(avg);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/statistics/days/" + this.year]);
  }

  private initForm() {
    const selectYear = this.year;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required)
    });
  }

  private populateAverageMap(avg) {
    this.averageMap.set("1", avg["1"] != null ? (-25 * avg["1"] + 100) : null);
    this.averageMap.set("2", avg["2"] != null ? (-25 * avg["2"] + 100) : null);
    this.averageMap.set("3", avg["3"] != null ? (-25 * avg["3"] + 100) : null);
    this.averageMap.set("4", avg["4"] != null ? (-25 * avg["4"] + 100) : null);
    this.averageMap.set("5", avg["5"] != null ? (-25 * avg["5"] + 100) : null);
    this.averageMap.set("6", avg["6"] != null ? (-25 * avg["6"] + 100) : null);
    this.averageMap.set("7", avg["7"] != null ? (-25 * avg["7"] + 100) : null);
    this.averageMap.set("8", avg["8"] != null ? (-25 * avg["8"] + 100) : null);
    this.averageMap.set("9", avg["9"] != null ? (-25 * avg["9"] + 100) : null);
    this.averageMap.set("10", avg["10"] != null ? (-25 * avg["10"] + 100) : null);
    this.averageMap.set("11", avg["11"] != null ? (-25 * avg["11"] + 100) : null);
    this.averageMap.set("12", avg["12"] != null ? (-25 * avg["12"] + 100) : null);
  }
}
