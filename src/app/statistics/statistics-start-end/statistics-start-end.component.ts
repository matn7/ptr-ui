import { Component, OnInit } from '@angular/core';
import { StatisticsTaskService } from "../../services/statistics.important.service";
import { Chart } from "angular-highcharts";
import { PtrColumnChart } from "../ptr-column-chart";
import { AuthenticationService } from "../../services/authentication.service";
import { StartEndDateRequest } from "../start-end-date-request";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GREEN_COLORS } from "../../app.constants";

@Component({
  selector: 'app-statistics-start-end',
  templateUrl: './statistics-start-end.component.html',
  styleUrls: ['./statistics-start-end.component.css']
})
export class StatisticsStartEndComponent implements OnInit {

  username: string;
  columnChart: Chart;
  myColumnChart: PtrColumnChart;
  startEndDateRequest: StartEndDateRequest;
  num: number;
  returnUrl: string;
  startDate: string;
  endDate: string;

  selectDateRange: FormGroup;
  component: string;
  myMap: Map<number, number>;
  startEndData: any;
  colors: string[];

  title: string;

  constructor(
    private route: ActivatedRoute,
    private statisticsTaskService: StatisticsTaskService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private customErrorMsgService: CustomErrorMessageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.username = this.authService.getAuthenticatedUser();

    this.route.params.subscribe(params => {
      this.component = params["component"];
      this.startDate = params["startDate"];
      this.endDate = params["endDate"];
      // this.startDate = this.datepipe.transform(
      //   new Date(this.year, this.month - 1, this.day),
      //   "yyyy-MM-dd"
      // );
      this.num = +params["num"];
    });
    // this.startEndDateRequest = new StartEndDateRequest(this.startDate, this.endDate);
    // "statistics/startend/:component/:num/:startDate/:endDate",
    this.returnUrl = "/statistics/startend/important/1/";

    this.myColumnChart = new PtrColumnChart();
    this.title = this.component;
    this.myMap = new Map<number, number>();
    this.colors = GREEN_COLORS;

    this.initForm();

    this.startEndDateRequest = new StartEndDateRequest(this.startDate, this.endDate);

    this.statisticsTaskService
      .getImportantStartEnd(this.username, this.component, this.num,
        this.startEndDateRequest)
        .subscribe(
          data => {
            console.log("ngInit[0] 100 >>>>>> " + data[0]);
            console.log("ngInit[1] 75  >>>>>> " + data[1]);
            console.log("ngInit[2] 50  >>>>>> " + data[2]);
            console.log("ngInit[3] 25  >>>>>> " + data[3]);
            console.log("ngInit[4] 0   >>>>>> " + data[4]);
            
            this.startEndData = data;

            this.myMap.set(0, data[0]);
            this.myMap.set(1, data[1]);
            this.myMap.set(2, data[2]);
            this.myMap.set(3, data[3]);
            this.myMap.set(4, data[4]);


            console.log("myMap >>>>>> " + this.myMap);

            this.columnChart = this.myColumnChart.getStartEndColumnChart(
              this.myMap,
              this.title,
              this.colors
            );
          },
          error => {
            this.customErrorMsgService.displayMessage(error, this.returnUrl);
          }
        );

  }

  onSumbit() {
    this.component = this.selectDateRange.value.component;
    this.startDate = this.selectDateRange.value.startDate;
    this.endDate = this.selectDateRange.value.endDate;

    this.startEndDateRequest.startDate = this.startDate;
    this.startEndDateRequest.endDate = this.endDate;

    this.statisticsTaskService
      .getImportantStartEnd(this.username, this.component, this.num,
      this.startEndDateRequest)
      .subscribe(
        data => {
          console.log("onSubmit >>>>>>> " + data);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    // navigate to this data
    // "statistics/startend/:component/:num/:startDate/:endDate"
    this.router.navigate(["/statistics/startend/important/" + this.num +"/" + this.startDate + "/" + this.endDate]);
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

}
