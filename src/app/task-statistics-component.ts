import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "./services/statistics.important.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "./registration/authentication.service";
import { ErrorService } from "./services/data/error.service";
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "./app.constants";
import * as Highcharts from 'highcharts';
import { TimeService } from "./services/data/time.service";

export class TaskStatisticsComponent implements OnInit {
  year: number;
  num: number;
  title: string;
  username: string;
  colors: string[][];
  selectDate: FormGroup;
  selectImportantTask: FormGroup;

  highcharts = Highcharts;

  selectTask: number;
  selectTask2: number;
  selectTask3: number;

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
          console.log("++++++++++>>>" + count)
          this.populateCountMap(count);
          this.pieChart();
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
          this.columnChart();
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
          this.pieChart();
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
          this.columnChart();
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
          name: 'Task ' + this.num,
          colors: this.colors[this.num - 1],
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
        name: 'Important ' + this.num,
        color: this.colors[this.num - 1][0],
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

// data: [
//   avg["1"] != undefined ? (-25 * avg["1"] + 100) : '',
//   avg["2"] != undefined ? (-25 * avg["2"] + 100) : '',
//   avg["3"] != undefined ? (-25 * avg["3"] + 100) : '',
//   avg["4"] != undefined ? (-25 * avg["4"] + 100) : '',
//   avg["5"] != undefined ? (-25 * avg["5"] + 100) : '',
//   avg["6"] != undefined ? (-25 * avg["6"] + 100) : '',
//   avg["7"] != undefined ? (-25 * avg["7"] + 100) : '',
//   avg["8"] != undefined ? (-25 * avg["8"] + 100) : '',
//   avg["9"] != undefined ? (-25 * avg["9"] + 100) : '',
//   avg["10"] != undefined ? (-25 * avg["10"] + 100) : '',
//   avg["11"] != undefined ? (-25 * avg["11"] + 100) : '',
//   avg["12"] != undefined ? (-25 * avg["12"] + 100) : '']