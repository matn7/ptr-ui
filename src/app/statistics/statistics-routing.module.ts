import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";
import { StatisticsImportantComponent } from "./statistics-important/statistics-important.component";
import { StatisticsLessimportantComponent } from "./statistics-lessimportant/statistics-lessimportant.component";
import { StatisticsDaysComponent } from "./statistics-days/statistics-days.component";
import { StatisticsDaysMonthComponent } from "./statistics-days-month/statistics-days-month.component";
import { StatisticsStartEndComponent } from "./statistics-start-end/statistics-start-end.component";

const routes: Routes = [
    {
        path: '',
        component: StatisticsHomeComponent,
        children: [
            {
                path: 'important/:num/:year',
                component: StatisticsImportantComponent
            },
            {
                path: 'lessimportant/:num/:year',
                component: StatisticsLessimportantComponent
            },
            {
                path: 'days/:year',
                component: StatisticsDaysComponent
            },
            {
                path: 'days/:year/:month',
                component: StatisticsDaysMonthComponent
            },
            {
                path: 'startend/:component/:num/:startDate/:endDate',
                component: StatisticsStartEndComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule { }