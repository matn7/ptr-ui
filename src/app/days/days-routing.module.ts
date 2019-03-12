import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DaysComponent } from "./days.component";
import { DaysDetailComponent } from "./days-detail/days-detail.component";
import { DaysEditComponent } from "./days-edit/days-edit.component";

const daysRoutes: Routes = [
  {
    path: "days",
    component: DaysDetailComponent,
    children: [
      { path: "allDays", component: DaysComponent },
      { path: "new", component: DaysEditComponent },
      { path: ":id/edit", component: DaysEditComponent },
      { path: "days/:year/:month/:day", component: DaysComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(daysRoutes)],
  exports: [RouterModule]
})
export class DaysRoutingModule {}
