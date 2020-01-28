import {
  Component,
  OnInit,
  Input,
  HostListener,
  HostBinding
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Chart } from "angular-highcharts";
import { AuthenticationService } from "../../services/authentication.service";
import { StatisticsLessTaskService } from "../../services/statistics.lessimportant.service";
import { ToggleService } from "../../services/data/toggle.service";
import { PtrPieChart } from "../ptr-pie-chart";
import { PtrColumnChart } from "../ptr-column-chart";
import { CustomErrorMessageService } from "../../services/data/custom-error-message.service";

@Component({
  selector: "app-statistics-lessimportant",
  templateUrl: "./statistics-lessimportant.component.html",
  styleUrls: ["./statistics-lessimportant.component.css"]
})
export class StatisticsLessImportantComponent implements OnInit {
  year: number;
  num: number;
  title: string;
  username: string;
  colors: string[];
  green_colors: string[];
  yellow_colors: string[];
  blue_colors: string[];
  lessImportantTaskCount: any;
  lessImportantTaskAvg: any;
  selectDate: FormGroup;
  selectLessImportantTask: FormGroup;
  pieChart: Chart;
  myPieChart: PtrPieChart;
  columnChart: Chart;
  myColumnChart: PtrColumnChart;
  selectTask: number;
  selectTask2: number;
  selectTask3: number;

  errorMessage: string;
  returnUrl: string;

  myMap: Map<number, number>;

  @HostBinding("class.is-open")
  isGreenActive = false;
  @HostBinding("class.is-open")
  isYellowActive = false;
  @HostBinding("class.is-open")
  isBlueActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsLessTaskService: StatisticsLessTaskService,
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private customErrorMsgService: CustomErrorMessageService
  ) {}

  ngOnInit() {
    // set statistics route active
    this.toggle();
    this.isGreenActive = true;

    this.myMap = new Map<number, number>();
    console.log("Mymap:" + this.myMap);

    this.myPieChart = new PtrPieChart();
    this.myColumnChart = new PtrColumnChart();
    // this.pieChart = this.mycharts;

    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.year = +params["year"];
      this.num = +params["num"];
    });

    this.title = "Less important task " + this.num;
    this.green_colors = ["#61bc7b", "#80c995", "#a0d6af", "#bfe4ca", "#dff1e4"];
    this.yellow_colors = [
      "#fbcc56",
      "#fbd677",
      "#fce099",
      "#fdeabb",
      "#fef4dd"
    ];
    this.blue_colors = ["#63a0dd", "#82b3e3", "#a1c6ea", "#c0d9f1", "#dfecf8"];
    this.colors = this.green_colors;

    this.returnUrl = "/statistics/lessimportant/1/" + this.year + "/";

    this.initForm();

    this.statisticsLessTaskService
      .getLessImportantTaskCount(this.username, 1, this.year)
      .subscribe(
        count => {
          this.lessImportantTaskCount = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.lessImportantTaskCount,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsLessTaskService
      .getLessImportantTaskAvg(this.username, 1, this.year)
      .subscribe(
        avg => {
          this.lessImportantTaskAvg = avg;
          this.lessImportantTaskAvg.forEach(element => {
            this.myMap.set(element[0], element[1]);
          });
          this.columnChart = this.myColumnChart.getColumnChart(
            this.myMap,
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
    this.title = "Less important task " + this.num;
    this.myMap.clear();

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

    this.statisticsLessTaskService
      .getLessImportantTaskCount(this.username, this.num, this.year)
      .subscribe(
        count => {
          this.lessImportantTaskCount = count;
          this.pieChart = this.myPieChart.getPieChart(
            this.lessImportantTaskCount,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );

    this.statisticsLessTaskService
      .getLessImportantTaskAvg(this.username, this.num, this.year)
      .subscribe(
        avg => {
          this.lessImportantTaskAvg = avg;
          this.lessImportantTaskAvg.forEach(element => {
            this.myMap.set(element[0], element[1]);
          });

          this.columnChart = this.myColumnChart.getColumnChart(
            this.myMap,
            this.title,
            this.colors
          );
        },
        error => {
          this.customErrorMsgService.displayMessage(error, this.returnUrl);
        }
      );
    this.router.navigate([
      "/statistics/lessimportant/" + this.num + "/" + this.year
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

    this.selectDate = new FormGroup({
      selectYear: new FormControl(selectYear, Validators.required),
      selectTask: new FormControl(selectTask)
    });
  }
}
