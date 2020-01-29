import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DaysService } from "./services/days.service";
import { HttpModule } from "@angular/http";
import { CommonModule, DatePipe } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TaskService } from "./services/task.service";
import { ExtraordinaryComponent } from "./extraordinary/extraordinary.component";
import { ExtraordinaryEditComponent } from "./extraordinary/extraordinary-edit/extraordinary-edit.component";
import { ExtraordinaryDetailComponent } from "./extraordinary/extraordinary-detail/extraordinary-detail.component";
import { ExtraordinaryService } from "./services/extraordinary.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { StatisticsImportantComponent } from "./statistics/statistics-important/statistics-important.component";
import { ChartModule } from "angular-highcharts";
import { StatisticsTaskService } from "./services/statistics.important.service";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./error/error.component";
import { HttpInterceptorAuthService } from "./services/http/http-interceptor-auth.service";
import { AuthenticationService } from "./services/authentication.service";
import { LogoutComponent } from "./logout/logout.component";
import { HandleErrorsService } from "./services/handle-errors.service";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationService } from "./services/registration.service";
import { ToggleService } from "./services/data/toggle.service";
import { TimeService } from "./services/data/time.service";
import { AppInternalMessagesService } from "./services/data/app-internal-messages.service";
import { PasswordResetComponent } from "./registration/password-reset/password-reset.component";
import { PasswordChangeComponent } from "./registration/password-change/password-change.component";
import { MessageComponent } from "./common/message/message.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";
import { DaysComponent } from "./days/days.component";
import { DaysDetailComponent } from "./days/days-detail/days-detail.component";
import { DaysEditComponent } from "./days/days-edit/days-edit.component";
import { ActivateUserComponent } from "./registration/activate-user/activate-user.component";
import { StatisticsDaysComponent } from "./statistics/statistics-days/statistics-days.component";
import { StatisticsDaysMonthComponent } from "./statistics/statistics-days-month/statistics-days-month.component";
import { UserComponent } from "./user/user.component";

// Angular material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
// ***

import { MatComponentsModule } from "src/app/mat-components.module";
import { TaskEditComponent } from "./important/important-edit/task-edit.component";
import { TaskDetailComponent } from "./important/important-detail/task-detail.component";
import { TaskIndexComponent } from "./important/important-index/task-index.component";
import { UserService } from "./services/user.service";
import { AdminComponent } from './admin/admin.component';
import { AdminUserService } from "./services/admin/admin-user.service";
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { StatisticsStartEndComponent } from './statistics/statistics-start-end/statistics-start-end.component';

@NgModule({
  // entryComponents: [
  //   ExtraordinaryComponent
  // ],
  declarations: [
    AppComponent,
    HomeComponent,
    DaysComponent,
    DaysDetailComponent,
    DaysEditComponent,
    ExtraordinaryComponent,
    ExtraordinaryEditComponent,
    ExtraordinaryDetailComponent,
    TaskIndexComponent,
    TaskEditComponent,
    TaskDetailComponent,
    StatisticsComponent,
    StatisticsImportantComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    LogoutComponent,
    RegistrationComponent,
    PasswordResetComponent,
    PasswordChangeComponent,
    MessageComponent,
    FooterComponent,
    HeaderComponent,
    ActivateUserComponent,
    StatisticsDaysComponent,
    StatisticsDaysMonthComponent,
    UserComponent,
    AdminComponent,
    AdminUserComponent,
    StatisticsStartEndComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    BrowserAnimationsModule,
    MatComponentsModule
  ],
  providers: [
    DaysService,
    TaskService,
    ExtraordinaryService,
    StatisticsTaskService,
    RegistrationService,
    HandleErrorsService,
    ToggleService,
    AuthenticationService,
    TimeService,
    AppInternalMessagesService,
    UserService,
    AdminUserService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorAuthService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
