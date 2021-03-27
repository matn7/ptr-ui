import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DateRequest } from "../date-request";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StatisticsDaysService } from "../../services/statistics-days.service";
import { ErrorService } from "../../services/data/error.service";
import { MONTH_NAMES, GREEN_COLORS } from "../../app.constants";
import { WeekDay } from "@angular/common";
import * as Highcharts from 'highcharts';

@Component({
  selector: "app-statistics-days-month",
  templateUrl: "./statistics-days-month.component.html"
})
export class StatisticsDaysMonthComponent implements OnInit {
  username: string;
  year: number;
  month: number;
  title: string;
  returnUrl: string;
  dateRequest: DateRequest;
  selectDate: FormGroup;
  monthDay: Array<number>;
  daysInMonth: number;
  monthWeekDayArr: Array<string>;

  highcharts = Highcharts;

  countMap: Map<string, number>;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private statisticsDaysService: StatisticsDaysService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.month = +params["month"];
    });

    this.countMap = new Map<string, number>();

    this.username = this.authService.getAuthenticatedUser();

    this.title = "Mood for " + this.year + " / " + MONTH_NAMES[this.month - 1];
    this.returnUrl = "/statistics/days/" + this.year + "/" + this.month;
    this.dateRequest = new DateRequest(this.year, this.month);

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.monthWeekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    console.log("********************>>> " + this.monthWeekDayArr);

    this.initForm();

    this.statisticsDaysService
      .retrieveDaysByUsernameMonthAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.populateCountMap(count);
          this.pieChart();
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
      

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        dayMade => {
          this.columnChart(dayMade);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.month = this.selectDate.value.selectMonth;
    this.title = "Mood for " + this.year + " / " + MONTH_NAMES[this.month - 1];
    this.dateRequest.year = this.year;
    this.dateRequest.month = this.month;

    // Num of days in month
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    // monthDay
    this.monthDay = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i);
    this.monthWeekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) =>
          i +
          1 +
          " " +
          WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
      );

    this.statisticsDaysService
      .retrieveDaysByUsernameMonthAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.populateCountMap(count);
          this.pieChart();
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveMonthWeekDaysByUsernameMonthAndYear(
        this.username,
        this.dateRequest
      )
      .subscribe(
        dayMade => {
          this.columnChart(dayMade);
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );

    this.router.navigate(["/statistics/days/" + this.month + "/" + this.year]);
  }

  private populateCountMap(count) {
    this.countMap.set("100", count["100"]);
    this.countMap.set("75", count["75"]);
    this.countMap.set("50", count["50"]);
    this.countMap.set("25", count["25"]);
    this.countMap.set("0", count["0"]);
  }

  private initForm() {
    const selectYear = this.year;
    const selectMonth = this.month;

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectMonth: new FormControl(selectMonth, Validators.required)
    });
  }

  chartOptions = {   
    chart : {
    },
    title : { 
    },
    tooltip : {
    },
    plotOptions : {
       pie: {}
    },
    series : [{
    }]
 };

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

  private pieChart() {
    this.chartOptions = {   
      chart : {
          plotBorderWidth: null,
          plotShadow: false
      },
      title : {
          text: 'Year Summary'    
      },
      tooltip : {
          pointFormat: '{point.y}'
      },
      plotOptions : {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>',
                style: {
                  color: 'black'
                }
            }
          }
      },
      series : [{
        type: 'pie',
        name: 'Task ',
        colors: GREEN_COLORS,
        data: [
        ['100', this.countMap.get("100")],
        ['75', this.countMap.get("75")],
        ['50', this.countMap.get("50")],
        ['25', this.countMap.get("25")],
        ['0', this.countMap.get("0")]
      ]
    }]
    };
  }

  private columnChart(dayMade) {
    this.columnChartOptions = {
      chart: {
        type: 'column',
        renderTo: 'container'
      },
      title: {
        text: 'Mood Daily'  
      },
      xAxis: {
        categories: 
          this.monthWeekDayArr
        
      },
      yAxis: {
        min: 0,
        max: 100,
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
        color: GREEN_COLORS[0],
        data: dayMade 
      }]
    };
  }
}

