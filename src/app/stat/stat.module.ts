import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { DaysBetweenComponent } from './days/days-between/days-between.component';
import { StatHomeComponent } from './stat-home/stat-home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.module';
import { DaysMonthAvgRateDayByYearComponent } from './days/days-month-avg-rate-day-by-year/days-month-avg-rate-day-by-year.component';


@NgModule({
  declarations: [DaysBetweenComponent, StatHomeComponent, DaysMonthAvgRateDayByYearComponent],
  imports: [
    CommonModule,
    StatRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatComponentsModule
  ]
})
export class StatModule { }
