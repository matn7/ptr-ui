import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DaysService } from "./days/days.service";
import { CommonModule, DatePipe } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TaskService } from "./services/task.service";
import { ExtraordinaryService } from "./extraordinary/extraordinary.service";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./common/error/error.component";
import { HttpInterceptorAuthService } from "./services/http/http-interceptor-auth.service";
import { AuthenticationService } from "./auth/authentication.service";
import { HandleErrorsService } from "./services/handle-errors.service";
import { RegistrationService } from "./auth/registration.service";
import { TimeService } from "./services/data/time.service";
import { ErrorMessagesService } from "./services/data/error-messages.service";
import { PasswordResetComponent } from "./auth/password-reset/password-reset.component";
import { PasswordChangeComponent } from "./auth/password-change/password-change.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";
import { ActivateUserComponent } from "./auth/activate-user/activate-user.component";
import { UserComponent } from "./user/user.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatComponentsModule } from "src/app/mat-components.module";
import { UserService } from "./services/user.service";
import { AdminComponent } from './admin/admin.component';
import { AdminUserService } from "./services/admin/admin-user.service";
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { MessageComponent } from "./common/message/message.component";
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    ErrorComponent,
    MessageComponent,
    PasswordResetComponent,
    PasswordChangeComponent,
    FooterComponent,
    HeaderComponent,
    ActivateUserComponent,
    UserComponent,
    AdminComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    SharedModule,
    AuthModule,
    HighchartsChartModule
  ],
  providers: [
    DaysService,
    TaskService,
    ExtraordinaryService,
    RegistrationService,
    HandleErrorsService,
    AuthenticationService,
    TimeService,
    ErrorMessagesService,
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
