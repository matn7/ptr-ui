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
import { ImportantService } from "./services/important.service";
import { ImportantModule } from "./important/important.module";
import { ExtraordinaryComponent } from "./extraordinary/extraordinary.component";
import { ExtraordinaryEditComponent } from "./extraordinary/extraordinary-edit/extraordinary-edit.component";
import { ExtraordinaryDetailComponent } from "./extraordinary/extraordinary-detail/extraordinary-detail.component";
import { ExtraordinaryService } from "./services/extraordinary.service";
import { LessimportantComponent } from "./lessimportant/lessimportant.component";
import { LessimportantIndexComponent } from "./lessimportant/lessimportant-index/lessimportant-index.component";
import { LessimportantEditComponent } from "./lessimportant/lessimportant-edit/lessimportant-edit.component";
import { LessimportantDetailComponent } from "./lessimportant/lessimportant-detail/lessimportant-detail.component";
import { LessImportantService } from "./services/lessimportant.service";
import { StatisticsComponent } from "./statistics/statistics.component";
import { StatisticsImportantComponent } from "./statistics/statistics-important/statistics-important.component";
import { ChartModule } from "angular-highcharts";
import { StatisticsImportantService } from "./services/statistics.important.service";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./error/error.component";
import { HttpInterceptorAuthService } from "./services/http/http-interceptor-auth.service";
import { AuthenticationService } from "./services/authentication.service";
import { StatisticsLessImportantComponent } from "./statistics/statistics-lessimportant/statistics-lessimportant.component";
import { StatisticsLessImportantService } from "./services/statistics.lessimportant.service";
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

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatComponentsModule } from "src/app/mat-components.module";
import { MatFormFieldModule } from "@angular/material";
import { ImportantComponent } from "./important/important.component";
import { ImportantEditComponent } from "./important/important-edit/important-edit.component";
import { ImportantDetailComponent } from "./important/important-detail/important-detail.component";
import { ImportantIndexComponent } from "./important/important-index/important-index.component";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DaysComponent,
    DaysDetailComponent,
    DaysEditComponent,
    ExtraordinaryComponent,
    ExtraordinaryEditComponent,
    ExtraordinaryDetailComponent,
    LessimportantComponent,
    LessimportantIndexComponent,
    LessimportantEditComponent,
    LessimportantDetailComponent,
    ImportantComponent,
    ImportantIndexComponent,
    ImportantEditComponent,
    ImportantDetailComponent,
    StatisticsComponent,
    StatisticsImportantComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    StatisticsLessImportantComponent,
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
    UserComponent
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
    ImportantService,
    LessImportantService,
    ExtraordinaryService,
    StatisticsImportantService,
    StatisticsLessImportantService,
    RegistrationService,
    HandleErrorsService,
    ToggleService,
    AuthenticationService,
    TimeService,
    AppInternalMessagesService,
    UserService,
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
