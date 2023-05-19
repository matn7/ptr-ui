import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { StatService } from '../../stat.service';
import { YearRequest } from '../../model/yearrequest.model';
import { Chart } from 'node_modules/chart.js';
import { DaysRate } from '../../model/daysrate.model';
import { MONTH_NAMES } from 'src/app/app.constants';

@Component({
  selector: 'app-days-month-avg-rate-day-by-year',
  templateUrl: './days-month-avg-rate-day-by-year.component.html',
  styleUrls: ['./days-month-avg-rate-day-by-year.component.css']
})
export class DaysMonthAvgRateDayByYearComponent implements OnInit {

  username: string;
  monthAverageForm: FormGroup;
  returnUrl: string;
  year: number;
  myChart: Chart;
  daysRate: DaysRate[];
  months: string[];
  rateDaysAvg: number[];

  constructor(
    private statService: StatService,
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.year = 2017;
    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/stat";
    this.initForm();
    console.log('ngOnInit');
    this.daysRate = [];
    // this.loadData({ year: this.year });
    // this.displayChart({ year: this.year });
  }

  onSubmit() {
    this.displayChart(this.monthAverageForm.value);
  }

  private displayChart(year: YearRequest) {
  
    this.loadData(year);

    this.months = this.daysRate.map(d => MONTH_NAMES[d.startDate]); 
    this.rateDaysAvg = this.daysRate.map(d => d.rateDay);

    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: this.months,
          datasets: [{
            label: 'Mood',
            data: this.rateDaysAvg,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true, 
              max: 100
            }
          }]
        }
      }
    });
  }

  private loadData(year: YearRequest) {
    const round = (value: number): number => {
      return Math.round(100 * value);
    };  

    this.statService.daysMonthAvgRateDayByYear(this.username, year)
    .subscribe(
      response => {
        this.daysRate = response.map(d => {
          return {
            startDate: d.startDate,
            rateDay: round(1 - 0.2 * d.rateDay)
          } as DaysRate;
        });
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }

  private initForm() {
    const year = this.year;

    this.monthAverageForm = new FormGroup({
      year: new FormControl(year, Validators.required)
    });
  }

}
