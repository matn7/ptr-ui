import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImportantIndexComponent } from "./important-index/important-index.component";
import { ImportantComponent } from "./important.component";
import { RouteGuardService } from "../services/route-guard.service";

const importantsRoutes: Routes = [
  {
    path: ":num",
    component: ImportantComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path: ":year/:month",
        component: ImportantIndexComponent,
        canActivate: [RouteGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(importantsRoutes)],
  exports: [RouterModule],
  providers: [RouteGuardService]
})
export class ImportantRoutingModule {}
