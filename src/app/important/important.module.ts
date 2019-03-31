import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ImportantComponent } from "./important.component";
import { ImportantEditComponent } from "./important-edit/important-edit.component";
import { ImportantIndexComponent } from "./important-index/important-index.component";
import { ImportantDetailComponent } from "./important-detail/important-detail.component";
import { ImportantRoutingModule } from "./important-routing.module";

@NgModule({
  declarations: [
    ImportantComponent,
    ImportantEditComponent,
    ImportantIndexComponent,
    ImportantDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImportantRoutingModule
  ]
})
export class ImportantModule {}
