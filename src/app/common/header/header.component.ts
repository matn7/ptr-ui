import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
} from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { ToggleService } from "../../services/data/toggle.service";
import { AppInternalMessagesService } from "../../services/data/app-internal-messages.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  day: number;
  month: number;
  year: number;
  date: Date;
  isLoggedInUser: boolean;
  name: string;

  isMsgFromBackend;

  @HostBinding("class.is-open")
  isUserActive = false;

  @HostBinding("class.is-open")
  isImportantActive = false;

  @HostBinding("class.is-open")
  isLessImportantActive = false;

  @HostBinding("class.is-open")
  isStatisticsActive = false;

  constructor(
    private authService: AuthenticationService,
    private toggleService: ToggleService,
    private appInternalMessageService: AppInternalMessagesService
  ) {}

  ngOnInit() {
    this.toggle();
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.isLoggedInUser = this.authService.isUserLoggedIn();
    this.name = this.authService.getAuthenticatedUser();

    this.toggleService.changeUser.subscribe(isActive => {
      this.isUserActive = isActive;
    });

    this.toggleService.changeImportant.subscribe(isActive => {
      this.isImportantActive = isActive;
    });

    this.toggleService.changeLessImportant.subscribe(isActive => {
      this.isLessImportantActive = isActive;
    });

    this.toggleService.changeStatistics.subscribe(isActive => {
      this.isStatisticsActive = isActive;
    });
  }

  @HostListener("click")
  private toggle() {
    this.toggleService.toggleHeaderClicked();
  }
}
