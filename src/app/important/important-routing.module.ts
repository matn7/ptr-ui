import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImportantHomeComponent } from "./important-home/important-home.component";
import { ImportantIndexNewComponent } from "./important-index-new/important-index-new.component";
import { ImportantEditComponent } from "./important-edit/important-edit.component";
import { ImportantDetailComponent } from "./important-detail/important-detail.component";

const routes: Routes = [
    {
        path: '',
        component: ImportantHomeComponent,
        children: [
            {
                path: ':year/:month',
                component: ImportantIndexNewComponent
            },
            {
                path: ':num/:year/:month/:day/new',
                component: ImportantEditComponent
            },
            {
                path: ':num/:id/edit',
                component: ImportantEditComponent
            },
            {
                path: ':num/:id/view',
                component: ImportantDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportantRoutingModule { }