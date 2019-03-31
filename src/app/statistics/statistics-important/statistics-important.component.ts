import { Component, OnInit, HostListener, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsImportantService } from "../../services/statistics.important.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Chart } from "angular-highcharts";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { PtrPieChart } from "../ptr-pie-chart";
import { PtrColumnChart } from "../ptr-column-chart";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "../../app.constants";

@Component({
  selector: "app-statistics-important",
  templateUrl: "./statistics-important.component.html",
  styleUrls: ["./statistics-important.component.css"]
})
export class StatisticsImportantComponent implements OnInit {
  year: number;
  num: number;
  title: string;
  username: string;
  colors: string[];
  green_colors: string[];
  yellow_colors: string[];
  blue_colors: string[];
  importantTask1Count: any;
  importantTask1Avg: any;
  selectDate: FormGroup;
  selectImportantTask: FormGroup;

  pieChart: Chart;
  myPieChart: PtrPieChart;
  columnChart: Chart;
  myColumnChart: PtrColumnChart;

  selectTask: number;
  selectTask2: number;
  selectTask3: number;

  errorMessage: string;
  returnUrl: string;

  @HostBinding("class.is-open")
  isGreenActive = false;
  @HostBinding("class.is-open")
  isYellowActive = false;
  @HostBinding("class.is-open")
  isBlueActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsImportantService: StatisticsImportantService,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();
    this.isGreenActive = true;

    this.myPieChart = new PtrPieChart();
    this.myColumnChart = new PtrColumnChart();

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.num = +params["num"];
    });

    this.title = "Important task " + this.num;
    this.green_colors = GREEN_COLORS;
    this.yellow_colors = YELLOW_COLORS;
    this.blue_colors = BLUE_COLORS;
    this.colors = this.green_colors;

    this.returnUrl = "/statistics/important/1/" + this.year + "/";

    this.initForm();

    this.statisticsImportantService
      .getImportantTaskCount(this.username, 1, this.year)
      .subscribe(
        count => {
          this.importantTask1Count = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.importantTask1Count,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.importantTask1Avg = this.statisticsImportantService
      .getImportantTaskAvg(this.username, 1, this.year)
      .subscribe(
        avg => {
          this.importantTask1Avg = avg;
          this.columnChart = this.myColumnChart.getColumnChart(
            this.importantTask1Avg,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.toggleService.changeGreenActive.subscribe(isActive => {
      this.isGreenActive = isActive;
    });

    this.toggleService.changeYellowActive.subscribe(isActive => {
      this.isYellowActive = isActive;
    });

    this.toggleService.changeBlueActive.subscribe(isActive => {
      this.isBlueActive = isActive;
    });
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.num = this.selectDate.value.selectTask;
    this.importantTask1Count = this.statisticsImportantService
      .getImportantTaskCount(this.username, this.num, this.year)
      .subscribe(
        count => {
          this.importantTask1Count = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.importantTask1Count,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.title = "Important task " + this.num;
    if (this.num == 1) {
      this.isGreenActive = true;
      this.isYellowActive = false;
      this.isBlueActive = false;
      this.colors = this.green_colors;
    }
    if (this.num == 2) {
      this.isGreenActive = false;
      this.isYellowActive = true;
      this.isBlueActive = false;
      this.colors = this.yellow_colors;
    }
    if (this.num == 3) {
      this.isGreenActive = false;
      this.isYellowActive = false;
      this.isBlueActive = true;
      this.colors = this.blue_colors;
    }

    this.statisticsImportantService
      .getImportantTaskAvg(this.username, this.num, this.year)
      .subscribe(
        avg => {
          this.importantTask1Avg = avg;
          this.columnChart = this.myColumnChart.getColumnChart(
            this.importantTask1Avg,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate([
      "/statistics/important/" + this.num + "/" + this.year
    ]);
  }

  onRadioButtonClicked(num: number) {
    if (num === 1) {
      this.toggleService.toggleGreen();
    }
    if (num === 2) {
      this.toggleService.toggleYellow();
    }
    if (num === 3) {
      this.toggleService.toggleBlue();
    }
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleStatistics();
  }

  private initForm() {
    const selectYear = this.year;
    const selectTask = this.selectTask;
    this.selectTask = 1;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectTask: new FormControl(selectTask)
    });
  }
}
