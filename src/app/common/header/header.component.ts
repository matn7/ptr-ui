import {
  Component,
  OnInit
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
  username: string;
  startDate: string;
  endDate: string;

  constructor(
    private authService: AuthenticationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.date = new Date();
    this.username = this.authService.getAuthenticatedUser();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.startDate = this.datepipe.transform(new Date(this.year, this.month - 1, this.day), DATE_FORMAT);
    this.endDate = this.datepipe.transform(new Date(), DATE_FORMAT);
  }
}
