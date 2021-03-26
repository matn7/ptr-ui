import { NgModule } from "@angular/core";
import { DaysHomeComponent } from "./days-home/days-home.component";
import { CommonModule } from "@angular/common";
import { DaysRoutingModule } from "./days-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from "../mat-components.module";
import { DaysDetailComponent } from "./days-detail/days-detail.component";
import { DaysEditComponent } from "./days-edit/days-edit.component";
import { DaysSingleComponent } from "./days-single/days-single.component";

@NgModule({
    declarations: [
        DaysHomeComponent,
        DaysDetailComponent,
        DaysEditComponent,
        DaysSingleComponent
    ],
    imports: [
        CommonModule,
        DaysRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule
    ]
})
export class DaysModule {}