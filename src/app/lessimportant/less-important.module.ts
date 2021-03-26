import { NgModule } from "@angular/core";
import { LessImportantIndexNewComponent } from "./less-important-index-new/less-important-index-new.component";
import { LessImportantHomeComponent } from './less-important-home/less-important-home.component';
import { CommonModule } from "@angular/common";
import { LessImportantRoutingModule } from "./less-important-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from "../mat-components.module";
import { LessImportantEditComponent } from "./lessimportant-edit/less-important-edit.component";
import { LessImportantDetailComponent } from "./lessimportant-detail/less-important-detail.component";

@NgModule({
    declarations: [
        LessImportantIndexNewComponent,
        LessImportantHomeComponent,
        LessImportantEditComponent,
        LessImportantDetailComponent
    ],
    imports: [
        CommonModule,
        LessImportantRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule
    ]
})
export class LessImportantModule {}