import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule, Component } from "@angular/core";
import { DaysComponent } from "./days/days.component";
import { DaysDetailComponent } from "./days/days-detail/days-detail.component";
import { DaysEditComponent } from "./days/days-edit/days-edit.component";
import { ExtraordinaryEditComponent } from "./extraordinary/extraordinary-edit/extraordinary-edit.component";
import { ExtraordinaryDetailComponent } from "./extraordinary/extraordinary-detail/extraordinary-detail.component";
import { StatisticsImportantComponent } from "./statistics/statistics-important/statistics-important.component";
import { LoginComponent } from "./login/login.component";
import { RouteGuardService } from "./services/route-guard.service";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ExtraordinaryComponent } from "./extraordinary/extraordinary.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { PasswordResetComponent } from "./registration/password-reset/password-reset.component";
import { PasswordChangeComponent } from "./registration/password-change/password-change.component";
import { ActivateUserComponent } from "./registration/activate-user/activate-user.component";
import { StatisticsDaysComponent } from "./statistics/statistics-days/statistics-days.component";
import { StatisticsDaysMonthComponent } from "./statistics/statistics-days-month/statistics-days-month.component";
import { UserComponent } from "./user/user.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminUserComponent } from "./admin/admin-user/admin-user.component";
import { StatisticsStartEndComponent } from "./statistics/statistics-start-end/statistics-start-end.component";
import { StatisticsLessimportantComponent } from "./statistics/statistics-lessimportant/statistics-lessimportant.component";
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
    path: "days/:year/:month/:day/new",
    component: DaysEditComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "days/:id/edit",
    component: DaysEditComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "days/:id/view",
    component: DaysDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "days/:year/:month/:day",
    component: DaysComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "extraordinary/all",
    component: ExtraordinaryComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "extraordinary/:year/:month/:day/new",
    component: ExtraordinaryEditComponent,
    canActivate: [RouteGuardService]
  },
  {   
    path: "extraordinary/:id/edit",
    component: ExtraordinaryEditComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "extraordinary/:id/view",
    component: ExtraordinaryDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics",
    component: StatisticsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics/important/:num/:year",
    component: StatisticsImportantComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics/lessimportant/:num/:year",
    component: StatisticsLessimportantComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics/days/:year",
    component: StatisticsDaysComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics/days/:year/:month",
    component: StatisticsDaysMonthComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: "statistics/startend/:component/:num/:startDate/:endDate",
    component: StatisticsStartEndComponent,
    canActivate: [RouteGuardService]
  },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
