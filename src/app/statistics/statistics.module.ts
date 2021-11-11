import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatisticsImportantComponent } from "./statistics-important/statistics-important.component";
import { StatisticsRoutingModule } from "./statistics-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from "../mat-components.module";
import { StatisticsLessimportantComponent } from "./statistics-lessimportant/statistics-lessimportant.component";
import { StatisticsDaysComponent } from "./statistics-days/statistics-days.component";
import { StatisticsDaysMonthComponent } from "./statistics-days-month/statistics-days-month.component";
import { StatisticsStartEndComponent } from "./statistics-start-end/statistics-start-end.component";
import { StatisticsHomeComponent } from "./statistics-home/statistics-home.component";
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        StatisticsHomeComponent,
        StatisticsImportantComponent,
        StatisticsLessimportantComponent,
        StatisticsDaysComponent,
        StatisticsDaysMonthComponent,
        StatisticsStartEndComponent
    ],
    imports: [
        CommonModule,
        StatisticsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule,
        ChartsModule
    ]
})
export class StatisticsModule {}