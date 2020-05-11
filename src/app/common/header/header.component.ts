import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
} from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  day: number;
  month: number;
  year: number;
  date: Date;
  isLoggedInUser: boolean;
  name: string;
  isActive: boolean;

  isMsgFromBackend;

  isUserActive = false;
  isImportantActive = false;
  isLessImportantActive = false;
  isStatisticsActive = false;

  constructor(
    private authService: AuthenticationService,
    private appInternalMessageService: AppInternalMessagesService,
    private router: Router
  ) {
    console.log(">>>>>>>>>>." + this.router.url);
  }

  ngOnInit() {
    this.toggle();
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.isLoggedInUser = this.authService.isUserLoggedIn();
    this.name = this.authService.getAuthenticatedUser();
  }

  @HostListener("click")
  private toggle() {
    console.log(">>>>>>>>>>." + this.router.url.split("/")[1]);
    this.isImportantActive = this.router.url.split("/")[1] === "important";
    this.isLessImportantActive = this.router.url.split("/")[1] === "lessimportant";
    this.isStatisticsActive = this.router.url.split("/")[1] === "statistics";


  }
}
