import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DaysHomeComponent } from "./days-home/days-home.component";
import { DaysEditComponent } from "./days-edit/days-edit.component";
import { DaysDetailComponent } from "./days-detail/days-detail.component";

const routes: Routes = [
    {
        path: '',
        component: DaysHomeComponent,
        children: [
            {
                path: ':year/:month/:day/new',
                component: DaysEditComponent
            },
            {
                path: ':id/edit',
                component: DaysEditComponent
            },
            {
                path: ':id/view',
                component: DaysDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DaysRoutingModule {}