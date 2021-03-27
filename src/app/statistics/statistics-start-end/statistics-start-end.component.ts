import { Component, OnInit } from '@angular/core';
import { StatisticsTaskService } from "../../services/statistics.important.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { StartEndDateRequest } from "../start-end-date-request";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorService } from "../../services/data/error.service";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "../../app.constants";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics-start-end',
  templateUrl: './statistics-start-end.component.html'
})
export class StatisticsStartEndComponent implements OnInit {

  username: string;
  startEndDateRequest: StartEndDateRequest;
  num: number;
  returnUrl: string;
  startDate: string;
  endDate: string;

  selectDateRange: FormGroup;
  component: string;
  countMap: Map<string, number>;
  startEndData: any;
  colors: string[][];

  highcharts = Highcharts;

  title: string;

  constructor(
    private route: ActivatedRoute,
    private statisticsTaskService: StatisticsTaskService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.countMap = new Map<string, number>();

    this.username = this.authService.getAuthenticatedUser();

    this.route.params.subscribe(params => {
      this.component = params["component"];
      this.startDate = params["startDate"];
      this.endDate = params["endDate"];
      this.num = +params["num"];
    });
    this.returnUrl = "/statistics/startend/important/1/";

    this.title = this.component;
    
    this.colors = [GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS];

    this.startEndDateRequest = new StartEndDateRequest(this.startDate, this.endDate);

    this.statisticsTaskService
      .getImportantStartEnd(this.username, this.component, this.num,
        this.startEndDateRequest)
        .subscribe(
          count => {
            // this.countMap.set("0", count[0]);
            // this.countMap.set("1", count[1]);
            // this.countMap.set("2", count[2]);
            // this.countMap.set("3", count[3]);
            // this.countMap.set("4", count[4]);
            this.populateCountMap(count);
            this.columnChart();

          },
          error => {
            this.errorService.displayMessage(error, this.returnUrl);
          }
        );
        this.initForm();

  }

  onSubmit() {
    console.log("...............................................");
    this.countMap.clear();
    this.component = this.selectDateRange.value.selectComponent;
    this.startDate = this.selectDateRange.value.selectStartDate;
    this.endDate = this.selectDateRange.value.selectEndDate;

    this.startEndDateRequest.startDate = this.startDate;
    this.startEndDateRequest.endDate = this.endDate;

    console.log("component: " + this.component);

    this.statisticsTaskService
      .getImportantStartEnd(this.username, this.component, this.num,
      this.startEndDateRequest)
      .subscribe(
        count => {
          this.populateCountMap(count);
          this.columnChart();
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate(["/statistics/startend/" + this.component + "/" + this.num +"/" + this.startDate + "/" + this.endDate]);
  }

  private initForm() {
    const selectComponent = this.component;
    const selectStartDate = this.startDate;
    const selectEndDate = this.endDate;

    this.selectDateRange = new FormGroup({
      selectComponent: new FormControl(selectComponent, Validators.required),
      selectStartDate: new FormControl(selectStartDate, Validators.required),
      selectEndDate: new FormControl(selectEndDate, Validators.required)
    });
  }

  private populateCountMap(count) {
    this.countMap.set("0", count[0] ? count[0] : 0);
    this.countMap.set("1", count[1] ? count[1] : 0);
    this.countMap.set("2", count[2] ? count[2] : 0);
    this.countMap.set("3", count[3] ? count[3] : 0);
    this.countMap.set("4", count[4] ? count[4] : 0);
  }


  columnChartOptions = {   
    chart : {
    },
    title : { 
    },
    xAxis: {
    },
    yAxis: {
    },
    tooltip : {
    },
    plotOptions : {
       column: {}
    },
    series : [{
    }]
  };


  private columnChart() {
    this.columnChartOptions = {
      chart: {
        type: 'column',
        renderTo: 'container'
      },
      title: {
        text: 'Month Average'  
      },
      xAxis: {
        categories: [
          '100',
          '75',
          '50',
          '25',
          '0'
        ]
      },
      yAxis: {
        min: 0,
        // max: 100,
        title: {
          text: 'Average'
        }
      },
      tooltip: {
        formatter: function () {
          return '' +
            this.x + ': ' + this.y;
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Important ',
        color: this.colors[this.num - 1][0],
        data: [
          this.countMap.get("0"), 
          this.countMap.get("1"), 
          this.countMap.get("2"), 
          this.countMap.get("3"), 
          this.countMap.get("4")
        ]
      }]
    };
  }
}
