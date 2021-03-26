import { NgModule } from "@angular/core";
import { ExtraordinaryDetailComponent } from "./extraordinary-detail/extraordinary-detail.component";
import { ExtraordinaryEditComponent } from "./extraordinary-edit/extraordinary-edit.component";
import { CommonModule } from "@angular/common";
import { ExtraordinaryRoutingModule } from "./extraordinary-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from "../mat-components.module";
import { ExtraordinaryListComponent } from "./extraordinary-list/extraordinary-list.component";
import { ExtraordinaryHomeComponent } from "./extraordinary-home/extraordinary-home.component";

@NgModule({
    declarations: [
        ExtraordinaryHomeComponent,
        ExtraordinaryDetailComponent,
        ExtraordinaryEditComponent,
        ExtraordinaryListComponent
    ],
    imports: [
        CommonModule,
        ExtraordinaryRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule
    ]
})
export class ExtraordinaryModule {}