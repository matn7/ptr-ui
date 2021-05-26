import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "./statistics/statistics.important.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "./auth/authentication.service";
import { ErrorService } from "./services/data/error.service";
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "./app.constants";
import { TimeService } from "./services/data/time.service";

export class TaskStatisticsComponent implements OnInit {
  year: number;
  num: number;
  title: string;
  username: string;
  colors: string[][];
  selectDate: FormGroup;
  selectImportantTask: FormGroup;

  errorMessage: string;
  returnUrl: string;
  target: string;

  // myMap: Map<number, number>;
  averageMap: Map<string, number>;
  countMap: Map<string, number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsTaskService: StatisticsTaskService,
    private authService: AuthenticationService,
    private errorService: ErrorService,
    private timeService: TimeService,
    target: string
  ) {
    this.target = target;
  }

  ngOnInit() {

    // this.myMap = new Map<number, number>();
    this.averageMap = new Map<string, number>();
    this.countMap = new Map<string, number>();

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.num = +params["num"];
    });

    this.returnUrl = "/statistics/" + this.target + "/1/" + this.year + "/";

    if (this.timeService.checkNumber(this.num) === -1) {
      this.redirectMsg();
      this.router.navigate([this.returnUrl]);
    }

    this.title = "Important task " + this.num;
    this.colors = [GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS];

    this.initForm();

    this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, this.num, this.year)
      .subscribe(
        count => {
          this.populateCountMap(count);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsTaskService
      .getImportantTaskAvg(this.username, this.target, this.num, this.year)
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
    this.num = this.selectDate.value.selectTask;
    this.countMap.clear();
    this.averageMap.clear();
    
    this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, this.num, this.year)
      .subscribe(
        count => {
          this.populateCountMap(count);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

    this.title = "Important task " + this.num;

    this.statisticsTaskService
      .getImportantTaskAvg(this.username, this.target, this.num, this.year)
      .subscribe(
        avg => {
          this.populateAverageMap(avg);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate([
      "/statistics/" + this.target + "/" + this.num + "/" + this.year
    ]);
  }

  private redirectMsg() {
    this.errorService.dateInFutureMessage();
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

  private populateCountMap(count) {
    // this.countMap.set("100", count["100"] != null ? count["100"] : '');
    // this.countMap.set("75", count["75"] != null ? count["75"] : '');
    // this.countMap.set("50", count["50"] != null ? count["50"] : '');
    // this.countMap.set("25", count["25"] != null ? count["25"] : '');
    // this.countMap.set("0", count["0"] != null ? count["0"] : '');

    this.countMap.set("100", count["100"]);
    this.countMap.set("75", count["75"]);
    this.countMap.set("50", count["50"]);
    this.countMap.set("25", count["25"]);
    this.countMap.set("0", count["0"]);
  }

  private initForm() {
    const selectYear = this.year;
    const selectTask = this.num;
    // this.selectTask = 1;

    console.log("============== " + this.num);
    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectTask: new FormControl(selectTask, Validators.required)
    });
  }

}