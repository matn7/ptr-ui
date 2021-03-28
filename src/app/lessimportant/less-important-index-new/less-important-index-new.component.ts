import { Component } from '@angular/core';
import { LessImportantService, LessImportantIndex, LessImportantIndexDayData } from 'src/app/lessimportant/less-important.service.';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { TimeService } from 'src/app/services/data/time.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { TaskIndexNewComponent } from 'src/app/task-index-new.component ';

@Component({
  selector: 'app-less-important-index-new',
  templateUrl: './less-important-index-new.component.html',
  styleUrls: ['./less-important-index-new.component.css']
})
export class LessImportantIndexNewComponent extends TaskIndexNewComponent {

  dataToDisplay: LessImportantIndexDayData[] = [];

  constructor(
    route: ActivatedRoute,
    indexService: LessImportantService, 
    authService: AuthenticationService,
    timeService: TimeService,
    router: Router,
    errorService: ErrorService
    ) { 
      super(route, indexService, authService, timeService, router, errorService, 
        "lessimportant", new LessImportantIndex()[31]);
    }

    processData() {
      let dayIndex = 0;
      let extraIndex = 0;
      let impIndex = 0;
      let imp2Index = 0;
      let imp3Index = 0;
      let oneDay: LessImportantIndexDayData;

      this.dataToDisplay = null;
      this.dataToDisplay = [];
  
      for (let day of this.monthDaysArr) {
        
        oneDay = new LessImportantIndexDayData();
  
        if (this.indexData['extraordinaryDTO'][extraIndex]) {
          if (day === this.indexData['extraordinaryDTO'][extraIndex].startDate[2]) {
            oneDay.extraordinaryDTO = this.indexData['extraordinaryDTO'][extraIndex];
            extraIndex++;
          } else {
            oneDay.extraordinaryDTO = null;
          }
        }
  
        if (this.indexData['daysDTO'][dayIndex]) {
          if (day === this.indexData['daysDTO'][dayIndex].startDate[2]) {
            oneDay.daysDTO = this.indexData['daysDTO'][dayIndex];
            dayIndex++;
          } else {
            oneDay.daysDTO = null;
          }
        }
  
        if (this.indexData['lessImportantDTO'][impIndex]) {
          if (day === this.indexData['lessImportantDTO'][impIndex].startDate[2]) {
            oneDay.lessImportantDTO = this.indexData['lessImportantDTO'][impIndex];
            impIndex++;
          } else {
            oneDay.lessImportantDTO = null;
          }
        }
  
        if (this.indexData['lessImportant2DTO'][imp2Index]) {
          if (day === this.indexData['lessImportant2DTO'][imp2Index].startDate[2]) {
            oneDay.lessImportant2DTO = this.indexData['lessImportant2DTO'][imp2Index];
            imp2Index++;
          } else {
            oneDay.lessImportant2DTO = null;
          }
        }
  
        if (this.indexData['lessImportant3DTO'][imp3Index]) {
          if (day === this.indexData['lessImportant3DTO'][imp3Index].startDate[2]) {
            oneDay.lessImportant3DTO = this.indexData['lessImportant3DTO'][imp3Index];
            imp3Index++;
          } else {
            oneDay.lessImportant3DTO = null;
          }
        }
  
        this.dataToDisplay.push(oneDay);
  
      }
    }

}
