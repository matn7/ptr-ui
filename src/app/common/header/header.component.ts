import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { AuthenticationService } from "../../auth/authentication.service";
import { Router, ActivatedRoute, RouterEvent } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DATE_FORMAT, DETAIL_DATE_FORMAT } from "../../app.constants";
import { filter } from "rxjs/operators";
import { ImportantEditComponent } from "src/app/important/important-edit/important-edit.component";
import { Subscription } from "rxjs";


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
  activeUrl: string;

  subscription: Subscription;

  @Input()
  second: ImportantEditComponent;

  @Output()
  dataChangedEvent = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof RouterEvent)
    ).subscribe((event: RouterEvent) => {
      if(event) {
          // console.log("Event: " + event.url);
          // console.log(event.url.includes("important"));
          this.activeUrl = "active";
      }
    });
  }

  ngOnInit() {
    this.date = new Date();
    this.username = this.authService.getAuthenticatedUser();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.startDate = this.datepipe.transform(new Date(this.year, this.month - 1, this.day), DATE_FORMAT);
    this.endDate = this.datepipe.transform(new Date(), DATE_FORMAT);
    this.dataChangedEvent.emit('event');
  }

  toActivate(url: string) {
    return this.activeUrl.includes(url) ? "active" : "";
  }

  loadData() {
    console.log('event occured --- ');
    this.dataChangedEvent.emit('event');
  }
}
