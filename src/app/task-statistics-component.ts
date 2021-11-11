import { Component, Inject, Injectable, OnInit, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "./statistics/statistics.important.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "./auth/authentication.service";
import { ErrorService } from "./services/data/error.service";
import { TimeService } from "./services/data/time.service";
import { YearRequest } from "./statistics/year-request";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { BLUE_COLORS, GREEN_COLORS, YELLOW_COLORS } from "./app.constants";

@Injectable()
export abstract class TaskStatisticsComponent implements OnInit {

  year: number;
  num: number;
  title: string;
  username: string;
  selectDate: FormGroup;
  selectImportantTask: FormGroup;
  yearRequest: YearRequest;
  errorMessage: string;
  returnUrl: string;
  target: string;
  role: Map<string, string> = new Map<string, string>();

  colors = [GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left'
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['100', '75', '50', '25', '0'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(30,136,229,1)', 'rgba(30,136,229,0.75)', 
      'rgba(30,136,229,0.50)', 'rgba(30,136,229,0.25)', 'rgba(30,136,229,0)'],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsTaskService: StatisticsTaskService,
    private authService: AuthenticationService,
    private errorService: ErrorService,
    private timeService: TimeService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.num = +params["num"];
    });

    this.returnUrl = "/statistics/" + this.target + "/1/" + this.year;

    if (this.timeService.checkNumber(this.num) === -1) {
      this.redirectMsg();
      this.router.navigate([this.returnUrl]);
    }

    this.title = "Important task " + this.num;

    this.yearRequest = new YearRequest(this.year);

    this.initForm();

    this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, this.num, this.yearRequest)
      .subscribe(
        count => {
          this.pieChartData = [count['100'], count['75'], count['50'], count['25'], count['0']];
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

      this.pieChartColors = [
        {
          backgroundColor: this.colors[this.num - 1]
        },
      ];

    this.title = "Important task " + this.num;
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.num = this.selectDate.value.selectTask;

    this.yearRequest.year = this.year;
    
    this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, this.num, this.yearRequest)
      .subscribe(
        count => {
          this.pieChartData = [count['100'], count['75'], count['50'], count['25'], count['0']];
          this.role = count;
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

      this.pieChartColors = [
        {
          backgroundColor: this.colors[this.num - 1]
        },
      ];

    this.title = "Important task " + this.num;

    this.router.navigate([
      "/statistics/" + this.target + "/" + this.num + "/" + this.year
    ]);
  }

  private redirectMsg() {
    this.errorService.dateInFutureMessage();
  }

  public setTarget(target: string) {
    this.target = target;
  }


  private initForm() {
    const selectYear = this.year;
    const selectTask = this.num;
    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectTask: new FormControl(selectTask, Validators.required)
    });
  }

}