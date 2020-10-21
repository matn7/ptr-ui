import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsDaysService } from "../../services/statistics-days.service";
import { AuthenticationService } from "../../services/authentication.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DateRequest } from "../date-request";
import { GREEN_COLORS } from "../../app.constants";
import * as Highcharts from 'highcharts';

@Component({
  selector: "app-statistics-days",
  templateUrl: "./statistics-days.component.html"
})
export class StatisticsDaysComponent implements OnInit {
  year: number;
  username: string;
  title: string;
  selectDate: FormGroup;
  green_colors: string[];
  returnUrl: string;
  myMap: Map<number, number>;

  dateRequest: DateRequest;

  highcharts = Highcharts;

  countMap: Map<string, number>;
  averageMap: Map<string, number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsDaysService: StatisticsDaysService,
    private authService: AuthenticationService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.myMap = new Map<number, number>();
    

    this.username = this.authService.getAuthenticatedUser();
    this.green_colors = GREEN_COLORS;
    this.route.params.subscribe(params => {
      this.year = +params["year"];
    });
    this.title = "Mood for " + this.year;
    this.returnUrl = "/statistics/days/" + this.year + "/";

    this.dateRequest = new DateRequest(this.year, 0);

    this.averageMap = new Map<string, number>();
    this.countMap = new Map<string, number>();

    this.initForm();

    this.statisticsDaysService
      .retrieveDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.populateCountMap(count);
          this.pieChart();
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.populateAverageMap(avg);
          this.columnChart();
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.title = "Mood for " + this.year;
    this.dateRequest.year = this.year;
    this.countMap.clear();
    this.averageMap.clear();

    this.statisticsDaysService
      .retrieveDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        count => {
          this.populateCountMap(count);
          this.pieChart();
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsDaysService
      .retrieveAvgDaysByUsernameAndYear(this.username, this.dateRequest)
      .subscribe(
        avg => {
          this.populateAverageMap(avg);
          this.columnChart();
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
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

  private populateCountMap(count) {
    console.log(count["1"]);
    this.countMap.set("100", count["0"]);
    this.countMap.set("75", count["1"]);
    this.countMap.set("50", count["2"]);
    this.countMap.set("25", count["3"]);
    this.countMap.set("0", count["4"]);
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
  //   series : [{
  //     type: 'pie',
  //     name: 'Task ',
  //     colors: GREEN_COLORS,
  //     data: [
  //       ['100', this.countMap.get("100")],
  //       ['75', this.countMap.get("75")],
  //       ['50', this.countMap.get("50")],
  //       ['25', this.countMap.get("25")],
  //       ['0', this.countMap.get("0")]
  //     ]
  // }]
  };
}

private columnChart() {
  // Calculate values
  // f(x) = ax + b
  // f(0) = 100
  // f(4) = 0
  // 100 = a * 0 + b ===> b = 100
  // 0 = 4 * a + 100 ===> a = -25
  // f(x) = -25x + 100
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
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
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
      data: [
        this.averageMap.get("1"),
        this.averageMap.get("2"),
        this.averageMap.get("3"),
        this.averageMap.get("4"),
        this.averageMap.get("5"),
        this.averageMap.get("6"),
        this.averageMap.get("7"),
        this.averageMap.get("8"),
        this.averageMap.get("9"),
        this.averageMap.get("10"),
        this.averageMap.get("11"),
        this.averageMap.get("12")
      ]
    }]
  };
}
}
