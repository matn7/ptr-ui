import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
} from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DATE_FORMAT, DETAIL_DATE_FORMAT } from "../../app.constants";

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

  startDate: string;
  endDate: string;

  constructor(
    private authService: AuthenticationService,
    private appInternalMessageService: AppInternalMessagesService,
    private datepipe: DatePipe,
    private router: Router
  ) {
    console.log(">>>>>>>>>>." + this.router.url);
  }

  ngOnInit() {
    this.toggle();
    this.date = new Date();

    console.log("Daaaaaaaaay -> " + this.startDate);

    this.day = this.date.getDate();
    
    this.month = this.date.getMonth() + 1;
    console.log("Moooooonth -> " + this.month);
    this.year = this.date.getFullYear();
    this.isLoggedInUser = this.authService.isUserLoggedIn();
    this.name = this.authService.getAuthenticatedUser();

    this.startDate = this.datepipe.transform(new Date(this.year, this.month - 1, this.day), DATE_FORMAT);
    this.endDate = this.datepipe.transform(new Date(), DATE_FORMAT);
  }

  @HostListener("click")
  private toggle() {
    console.log(">>>>>>>>>>." + this.router.url.split("/")[1]);
    this.isImportantActive = this.router.url.split("/")[1] === "important";
    this.isLessImportantActive = this.router.url.split("/")[1] === "lessimportant";
    this.isStatisticsActive = this.router.url.split("/")[1] === "statistics";


  }
}
