import { Component, OnInit, HostListener, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticsTaskService } from "../../services/statistics.important.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
// import { Chart } from "angular-highcharts";
import { AuthenticationService } from "../../services/authentication.service";
import { HandleErrorsService } from "../../services/handle-errors.service";
import { ToggleService } from "../../services/data/toggle.service";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";
import { GREEN_COLORS, YELLOW_COLORS, BLUE_COLORS } from "../../app.constants";
import * as Highcharts from 'highcharts';
import { Stat } from "../../stat-data.component";
import { element } from "protractor";

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
  importantTask1Avg: any;
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
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    this.toggle();

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

  //   {
  //     "100": 2,
  //     "25": 2,
  //     "50": 3,
  //     "75": 1
  // }
      this.statisticsTaskService
      .getImportantTaskCount(this.username, this.target, 1, this.year)
      .subscribe(
        count => {
          this.pieChart(count);
          //   this.chartOptions = {   
          //     chart : {
          //        plotBorderWidth: null,
          //        plotShadow: false
          //     },
          //     title : {
          //        text: 'Important ' + this.num + ', ' + this.year + ' summary'    
          //     },
          //     tooltip : {
          //        pointFormat: '{point.y}'
          //     },
          //     plotOptions : {
          //        pie: {
          //           allowPointSelect: true,
          //           cursor: 'pointer',
          //           dataLabels: {
          //              enabled: true,
          //              format: '<b>{point.name}</b>',
          //              style: {
          //                 color: 'black'
          //              }
          //           }
          //        }
          //     },
          //     series : [{
          //        type: 'pie',
          //        name: 'Task ' + this.num,
          //        data: [
          //         ['100', count["100"]],
          //         ['75', count["75"]],
          //         ['50', count["50"]],
          //         ['25', count["25"]],
          //         ['0', count["0"]]
          //      ]
          //     }]
          //  };
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    //   [
    //     [
    //         1,
    //         2.0
    //     ],
    //     [
    //         2,
    //         0.5
    //     ]
    // ]
    this.statisticsTaskService
      .getImportantTaskAvg(this.username, this.target, 1, this.year)
      .subscribe(
        avg => {
          this.importantTask1Avg = avg;
          this.importantTask1Avg.forEach(element => {
            console.log("-----> " + element[0]);
            this.myMap.set(element[0], element[1]);
          });
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
          this.importantTask1Count = count;
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
          this.importantTask1Avg = avg;
          this.importantTask1Avg.forEach(element => {
            this.myMap.set(element[0], element[1]);
          });
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate([
      "/statistics/important/" + this.num + "/" + this.year
    ]);
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
}
