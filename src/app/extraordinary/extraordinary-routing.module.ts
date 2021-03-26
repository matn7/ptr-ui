import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExtraordinaryHomeComponent } from "./extraordinary-home/extraordinary-home.component";
import { ExtraordinaryEditComponent } from "./extraordinary-edit/extraordinary-edit.component";

const routes: Routes = [
    {
        path: '',
        component: ExtraordinaryHomeComponent,
        children: [
            {
                path: ':year/:month/:day/new',
                component: ExtraordinaryEditComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtraordinaryRoutingModule {}