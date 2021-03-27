import { NgModule } from "@angular/core";
import { RegistrationComponent } from "./registration/registration.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatComponentsModule } from "../mat-components.module";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
    declarations: [
        RegistrationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule, 
        // AuthRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatComponentsModule
    ]
})
export class AuthModule {}