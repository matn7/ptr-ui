import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.module';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MatComponentsModule
  ],
  exports: [InputComponent]
})
export class SharedModule { }
