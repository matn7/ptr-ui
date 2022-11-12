import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { DaysBetween } from '../../model/daysbetween.model';
import { YearBetween } from '../../model/yearbetween.model';
import { StatService } from '../../stat.service';

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
  daysBetween: DaysBetween;
  jsonResponse: string;

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
  }

  onSubmit() {
    this.yearStart = this.yearBetweenForm.value.yearStart;
    this.yearEnd = this.yearBetweenForm.value.yearEnd;
    console.log("Days Between");
    this.statService.daysBetween(this.username, this.yearBetweenForm.value)
    .subscribe(
      response => {
        this.jsonResponse = JSON.stringify(response);
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    )
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
