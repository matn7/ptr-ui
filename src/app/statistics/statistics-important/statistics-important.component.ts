import { Component, OnInit, HostListener, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "../../services/statistics.important.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
// import { Chart } from "angular-highcharts";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "../../app.constants";
import * as Highcharts from 'highcharts';

@Component({
  selector: "app-statistics-important",
  templateUrl: "./statistics-important.component.html"
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
  importantTask1Count: Map<string, number>;
  selectDate: FormGroup;
  selectImportantTask: FormGroup;

  highcharts = Highcharts;

  selectTask: number;
  selectTask2: number;
  selectTask3: number;

  errorMessage: string;
  returnUrl: string;
  target: string;

  myMap: Map<number, number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsTaskService: StatisticsTaskService,
    private authService: AuthenticationService,
    private handleError: HandleErrorsService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.importantTask1Count = new Map<string, number>();

    this.myMap = new Map<number, number>();

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.num = +params["num"];
      this.target = params["target"];
    });

    console.log("TARGET: " + this.target);

    this.title = "Important task " + this.num;
    this.green_colors = GREEN_COLORS;
    this.yellow_colors = YELLOW_COLORS;
    this.blue_colors = BLUE_COLORS;
    this.colors = this.green_colors;

    this.returnUrl = "/statistics/" + this.target + "/1/" + this.year + "/";

    this.initForm();

      this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, 1, this.year)
      .subscribe(
        count => {
          this.pieChart(count);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsTaskService
      .getImportantTaskAvg(this.username, this.target, 1, this.year)
      .subscribe(
        avg => {
          console.log("AVG -----> " + avg);
          this.columnChart(avg);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

      console.log("end of onInit: " + this.importantTask1Count.get("100"));
  }

  onSubmit() {
    this.year = this.selectDate.value.selectYear;
    this.num = this.selectDate.value.selectTask;
    this.myMap.clear();
    
    this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, this.num, this.year)
      .subscribe(
        count => {
          this.pieChart(count);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.title = "Important task " + this.num;

    this.statisticsTaskService
      .getImportantTaskAvg(this.username, this.target, this.num, this.year)
      .subscribe(
        avg => {
          this.columnChart(avg);
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate([
      "/statistics/important/" + this.num + "/" + this.year
    ]);
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

  private pieChart(count) {
    this.chartOptions = {   
      chart : {
          plotBorderWidth: null,
          plotShadow: false
      },
      title : {
          text: 'Important ' + this.num + ', ' + this.year + ' summary'    
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
          name: 'Task ' + this.num,
          colors: this.green_colors,
          data: [
          ['100', count["100"]],
          ['75', count["75"]],
          ['50', count["50"]],
          ['25', count["25"]],
          ['0', count["0"]]
        ]
      }]
    };
  }

  private columnChart(avg) {
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
        text: 'Título Column'
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
        name: 'Série 1',
        data: [avg[0] ? (-25 * avg[0][1] + 100) : '',
               avg[1] ? (-25 * avg[1][1] + 100) : '',
               avg[2] ? (-25 * avg[2][1] + 100) : '',
               avg[3] ? (-25 * avg[3][1] + 100) : '',
               avg[4] ? (-25 * avg[4][1] + 100) : '',
               avg[5] ? (-25 * avg[5][1] + 100) : '',
               avg[6] ? (-25 * avg[6][1] + 100) : '',
               avg[7] ? (-25 * avg[7][1] + 100) : '',
               avg[8] ? (-25 * avg[8][1] + 100) : '',
               avg[9] ? (-25 * avg[9][1] + 100) : '',
               avg[10] ? (-25 * avg[10][1] + 100) : '',
               avg[11] ? (-25 * avg[11][1] + 100) : '']
  
      }]
    };
  }
}
