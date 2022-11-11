import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { RouteGuardService } from "./services/route-guard.service";
import { ErrorComponent } from "./common/error/error.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PasswordResetComponent } from "./auth/password-reset/password-reset.component";
import { PasswordChangeComponent } from "./auth/password-change/password-change.component";
import { ActivateUserComponent } from "./auth/activate-user/activate-user.component";
import { UserComponent } from "./user/user.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminUserComponent } from "./admin/admin-user/admin-user.component";
import { AuthGuard } from "./services/auth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [RouteGuardService] },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "register", component: RegistrationComponent },
  { path: "forgotpassword", component: PasswordResetComponent },
  { path: "changeuserpassword", component: PasswordChangeComponent },
  { path: "activateaccount", component: ActivateUserComponent },
  {
    path: "important",
    canLoad: [AuthGuard],
    loadChildren: () => import('./important/important.module').then(mod => mod.ImportantModule)
  },
  {
    path: "lessimportant",
    canLoad: [AuthGuard],
    loadChildren: () => import('./lessimportant/less-important.module').then(mod => mod.LessImportantModule)
  },
  {
    path: "extraordinary",
    canLoad: [AuthGuard],
    loadChildren: () => import('./extraordinary/extraordinary.module').then(mod => mod.ExtraordinaryModule)
  },
  {
    path: "days",
    canLoad: [AuthGuard],
    loadChildren: () => import('./days/days.module').then(mod => mod.DaysModule)
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "admin/user",
    component: AdminUserComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "welcome/:name",
    component: WelcomeComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "user/:name",
    component: UserComponent,
    canActivate: [RouteGuardService]
  },
  { 
    path: "**", 
    component: ErrorComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
