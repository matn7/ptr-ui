import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LessImportantHomeComponent } from "./less-important-home/less-important-home.component";
import { LessImportantIndexNewComponent } from "./less-important-index-new/less-important-index-new.component";
import { LessImportantEditComponent } from "./lessimportant-edit/less-important-edit.component";
import { LessImportantDetailComponent } from "./lessimportant-detail/less-important-detail.component";

const routes: Routes = [
    {
        path: '',
        component: LessImportantHomeComponent,
        children: [
            {
                path: ':year/:month',
                component: LessImportantIndexNewComponent
            },
            {
                path: ':num/:year/:month/:day/new',
                component: LessImportantEditComponent
            },
            {
                path: ':num/:id/edit',
                component: LessImportantEditComponent
            },
            {
                path: ':num/:id/view',
                component: LessImportantDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LessImportantRoutingModule {}