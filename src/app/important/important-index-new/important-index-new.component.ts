import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Index } from 'src/app/index.model.';
import { ImportantService, ImportantIndex, DaysDTO, ExtraordinaryDTO, ImportantIndexClass, ImportantDTO } from 'src/app/services/important.service.';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomErrorMessageService } from 'src/app/services/data/custom-error-message.service';
import { WeekDay } from "@angular/common";
import { TimeService } from 'src/app/services/data/time.service';
import { GREEN_COMPLETION_STYLES, YELLOW_COMPLETION_STYLES, BLUE_COMPLETION_STYLES } from "../../app.constants";

@Component({
  selector: 'app-important-index-new',
  templateUrl: './important-index-new.component.html',
  styleUrls: ['./important-index-new.component.css']
})
export class ImportantIndexNewComponent implements OnInit {

  @Input() index: number = 0;

  username: string;
  importantIndex: ImportantIndex[];
  importantIndexFinal: ImportantIndexClass[] = [];
  oneObject: ImportantIndexClass;
  month: number;
  year: number;
  returnUrl: string;
  numbers: Array<number>;
  weekDayArr: Array<string>;
  daysInMonth: number;
  firstElement: number;
  indexElement: number = 0;
  today: number;
  date: Date;
  target: string;

  readonly yellow_completion_styles = YELLOW_COMPLETION_STYLES;
  readonly green_completion_styles = GREEN_COMPLETION_STYLES;
  readonly blue_completion_styles = BLUE_COMPLETION_STYLES;

  constructor(
    private route: ActivatedRoute,
    private importantIndexService: ImportantService, 
    private authService: AuthenticationService,
    private timeService: TimeService,
    private router: Router,
    private customErrorMsgService: CustomErrorMessageService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    this.numbers = Array(this.daysInMonth)
      .fill(0)
      .map((x, i) => i + 1);

    this.weekDayArr = Array(this.daysInMonth)
      .fill(0)
      .map(
        (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
    );

    this.today = new Date().getDay();
    this.date = new Date();

    this.today = this.timeService.getActiveDay(
      this.month,
      this.year,
      this.date
    );

    this.target = "important";

    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/important/" + this.year + "/" + this.month;

    this.importantIndexService
      .getTaskIndexData(this.username, "important", this.year, this.month)
      .subscribe(
        (data) => {
          this.importantIndex = data;
          console.log("===========================================");
          console.log(this.importantIndex);
          this.processData();
        }
    );
  }

  processData() {
    console.log("Init data here");
    let dayIndex = 0;
    let extraIndex = 0;
    let impIndex = 0;
    let imp2Index = 0;
    let imp3Index = 0;
    console.log("===> " + this.importantIndex['daysDTO'][dayIndex].startDate[2]);

    for (let entry of this.numbers) {
      
      this.oneObject = new ImportantIndexClass();

      if (this.importantIndex['extraordinaryDTO'][extraIndex]) {
        if (entry === this.importantIndex['extraordinaryDTO'][extraIndex].startDate[2]) {
          this.oneObject.extraordinaryDTO = this.importantIndex['extraordinaryDTO'][extraIndex];
          extraIndex++;
        } else {
          this.oneObject.extraordinaryDTO = null;
        }
      }

      if (this.importantIndex['daysDTO'][dayIndex]) {
        if (entry === this.importantIndex['daysDTO'][dayIndex].startDate[2]) {
          this.oneObject.daysDTO = this.importantIndex['daysDTO'][dayIndex];
          dayIndex++;
        } else {
          this.oneObject.daysDTO = null;
        }
      }

      if (this.importantIndex['importantDTO'][impIndex]) {
        if (entry === this.importantIndex['importantDTO'][impIndex].startDate[2]) {
          this.oneObject.importantDTO = this.importantIndex['importantDTO'][impIndex];
          impIndex++;
        } else {
          this.oneObject.importantDTO = null;
        }
      }

      if (this.importantIndex['important2DTO'][imp2Index]) {
        if (entry === this.importantIndex['important2DTO'][imp2Index].startDate[2]) {
          this.oneObject.important2DTO = this.importantIndex['important2DTO'][imp2Index];
          imp2Index++;
        } else {
          this.oneObject.important2DTO = null;
        }
      }

      if (this.importantIndex['important3DTO'][imp3Index]) {
        if (entry === this.importantIndex['important3DTO'][imp3Index].startDate[2]) {
          this.oneObject.important3DTO = this.importantIndex['important3DTO'][imp3Index];
          imp3Index++;
        } else {
          this.oneObject.important3DTO = null;
        }
      }

      this.importantIndexFinal.push(this.oneObject);

    }
    console.log("Important Index Final =====================>");
    console.log(this.importantIndexFinal);
  }

  onAddExtraordinaryClick(year, month, day) {
    this.router.navigate([
      "/extraordinary/" + year + "/" + month + "/" + day + "/new"
    ]);
  }

  onEditExtraordinaryClick(id) {
    this.router.navigate(["/extraordinary/" + id + "/edit"]);
  }

  onAddNewClick(target, num, year, month, day) {
    this.router.navigate([
      "/" + target + "/" + num + "/" + year + "/" + month + "/" + day + "/new"
    ], {replaceUrl: false});
  }

  onEditClick(target, num, id) {
    this.router.navigate(["/" + target + "/" + num + "/" + id + "/edit"]);
  }

  onAddDayClick(year, month, day) {
    this.router.navigate(["/days/" + year + "/" + month + "/" + day + "/new"]);
  }

  onEditDayClick(id) {
    this.router.navigate(["/days/" + id + "/edit"]);
  }


}
