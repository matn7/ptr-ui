import { NgModule } from '@angular/core';
import { ImportantHomeComponent } from "./important-home/important-home.component";
import { ImportantIndexNewComponent } from "./important-index-new/important-index-new.component";
import { ImportantRoutingModule } from "./important-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from '../mat-components.module';
import { ImportantEditComponent } from './important-edit/important-edit.component';
import { ImportantDetailComponent } from './important-detail/important-detail.component';

@NgModule({
    declarations: [
        ImportantHomeComponent,
        ImportantIndexNewComponent,
        ImportantEditComponent,
        ImportantDetailComponent
    ],
    imports: [
        CommonModule,
        ImportantRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule
    ]
})
export class ImportantModule {}