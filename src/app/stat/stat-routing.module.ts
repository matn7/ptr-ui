import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysBetweenComponent } from './days/days-between/days-between.component';
import { StatHomeComponent } from './stat-home/stat-home.component';


const routes: Routes = [
  {
    path: '',
    component: StatHomeComponent,
    children: [
      {
        path: 'days/daysbetween',
        component: DaysBetweenComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
