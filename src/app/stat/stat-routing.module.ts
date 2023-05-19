import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysBetweenComponent } from './days/days-between/days-between.component';
import { DaysMonthAvgRateDayByYearComponent } from './days/days-month-avg-rate-day-by-year/days-month-avg-rate-day-by-year.component';
import { StatHomeComponent } from './stat-home/stat-home.component';


const routes: Routes = [
  {
    path: '',
    component: StatHomeComponent,
    children: [
      {
        path: 'days/daysbetween',
        component: DaysBetweenComponent
      },
      {
        path: 'days/monthavgratedaybyyear',
        component: DaysMonthAvgRateDayByYearComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
