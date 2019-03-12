import { NgModule } from "@angular/core";
import {
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatInputModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule
} from "@angular/material";

@NgModule({
  exports: [
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class MatComponentsModule {}
