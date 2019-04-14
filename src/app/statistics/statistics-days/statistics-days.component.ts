import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { StatisticsDaysService } from "../../services/statistics-days.service";
import { AuthenticationService } from "../../services/authentication.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { PtrPieChart } from "../ptr-pie-chart";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Chart } from "angular-highcharts";
import { ToggleService } from "../../services/data/toggle.service";
import { DateRequest } from "../date-request";
import { PtrColumnChart } from "../ptr-column-chart";
import { GREEN_COLORS } from "../../app.constants";

@Component({
  selector: "app-statistics-days",
  templateUrl: "./statistics-days.component.html",
  styleUrls: ["./statistics-days.component.css"]
})
export class StatisticsDaysComponent implements OnInit {
  year: number;
  username: string;
  title: string;
  myPieChart: PtrPieChart;
  pieChart: Chart;
  selectDate: FormGroup;
  daysTaskCount: any;
  daysAvg: any;
  green_colors: string[];
  returnUrl: string;
  myMap: Map<number, number>;

  dateRequest: DateRequest;
  myColumnChart: PtrColumnChart;
  columnChart: Chart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsDaysService: StatisticsDaysService,
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();
    this.myPieChart = new PtrPieChart();
    this.myColumnChart = new PtrColumnChart();

    this.myMap = new Map<number, number>();

    this.username = this.authService.getAuthenticatedUser();
    this.green_colors = GREEN_COLORS;
    this.route.params.subscribe(params => {
      this.year = +params["year"];
    });
    this.title = "Mood for " + this.year;
    this.returnUrl = "/statistics/days/" + this.year + "/";

    this.dateRequest = new DateRequest(this.year, 0);

    this.initForm();

    this.statisticsDaysService
      .retrieveDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.daysTaskCount = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.daysTaskCount,
            this.title,
            this.green_colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.daysAvg = avg;
        
          this.daysAvg.forEach(element => {
            this.myMap.set(element[0], element[1]);
          });

          this.columnChart = this.myColumnChart.getColumnChart(
            this.myMap,
            this.title,
            this.green_colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  onSubmit() {
    this.toggle();
    this.year = this.selectDate.value.selectYear;
    this.title = "Mood for " + this.year;
    this.dateRequest.year = this.year;

    this.statisticsDaysService
      .retrieveDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.daysTaskCount = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.daysTaskCount,
            this.title,
            this.green_colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.daysAvg = avg;
          this.daysAvg.forEach(element => {
            this.myMap.set(element[0], element[1]);
          });
          this.columnChart = this.myColumnChart.getColumnChart(
            this.myMap,
            this.title,
            this.green_colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/statistics/days/" + this.year]);
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleStatistics();
  }

  private initForm() {
    const selectYear = this.year;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required)
    });
  }
}
