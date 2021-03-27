import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExtraordinaryHomeComponent } from "./extraordinary-home/extraordinary-home.component";
import { ExtraordinaryEditComponent } from "./extraordinary-edit/extraordinary-edit.component";
import { ExtraordinaryDetailComponent } from "./extraordinary-detail/extraordinary-detail.component";

const routes: Routes = [
    {
        path: '',
        component: ExtraordinaryHomeComponent,
        children: [
            {
                path: ':year/:month/:day/new',
                component: ExtraordinaryEditComponent
            },
            {
                path: ':id/edit',
                component: ExtraordinaryEditComponent
            },
            {
                path: ':id/view',
                component: ExtraordinaryDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtraordinaryRoutingModule {}