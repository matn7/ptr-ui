import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaysNewRoutingModule } from './days-new-routing.module';
import { DaysCreateComponent } from './days-create/days-create.component';


@NgModule({
  declarations: [DaysCreateComponent],
  imports: [
    CommonModule,
    DaysNewRoutingModule
  ]
})
export class DaysNewModule { }
