import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { DaysBetween } from '../../model/daysbetween.model';
import { YearBetween } from '../../model/yearbetween.model';
import { StatService } from '../../stat.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-days-between',
  templateUrl: './days-between.component.html',
  styleUrls: ['./days-between.component.css']
})
export class DaysBetweenComponent implements OnInit {

  username: string;
  yearBetweenForm: FormGroup;
  yearBetween: YearBetween;
  returnUrl: string;
  yearStart: number;
  yearEnd: number;
  daysBetween: DaysBetween[];
  jsonResponse: any;


  constructor(
    private route: ActivatedRoute,
    private statService: StatService,
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.yearStart = 2017;
    this.yearEnd = 2020;
    this.returnUrl = "/stat";
    this.username = this.authService.getAuthenticatedUser();
    this.initForm();

      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    

  }

  onSubmit() {
    this.yearStart = this.yearBetweenForm.value.yearStart;
    this.yearEnd = this.yearBetweenForm.value.yearEnd;
    console.log("Days Between");

    this.statService.daysBetween(this.username, this.yearBetweenForm.value)
    .subscribe(
      response => {

        this.daysBetween = response.map(d => {
          return {
            rateDay: d.rateDay,
            startDate: d.startDate
          } as DaysBetween;
        });

        // this.jsonResponse = JSON.stringify(response);
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
    console.log("days between >>>>> ");
    console.log(this.daysBetween);
    
  }

  private initForm() {
    const yearBetween = this.yearBetween;
    const yearStart = this.yearStart;
    const yearEnd = this.yearEnd;

    this.yearBetweenForm = new FormGroup({
      yearStart: new FormControl(yearStart, Validators.required),
      yearEnd: new FormControl(yearEnd, Validators.required)
    });
  }

}
