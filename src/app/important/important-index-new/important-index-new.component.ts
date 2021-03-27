import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/registration/authentication.service';
import { ImportantService, ImportantIndex, ImportantIndexDayData } from 'src/app/services/important.service.';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/data/error.service';
import { TimeService } from 'src/app/services/data/time.service';
import { TaskIndexNewComponent } from 'src/app/task-index-new.component ';

@Component({
  selector: 'app-important-index-new',
  templateUrl: './important-index-new.component.html',
  styleUrls: ['./important-index-new.component.css']
})
export class ImportantIndexNewComponent extends TaskIndexNewComponent {

  dataToDisplay: ImportantIndexDayData[];

  constructor(
    route: ActivatedRoute,
    importantIndexService: ImportantService, 
    authService: AuthenticationService,
    timeService: TimeService,
    router : Router,
    errorService: ErrorService
    ) { 
      super(route, importantIndexService, authService, timeService, router, 
        errorService, "important", new ImportantIndex()[31]);
    }

    processData() {
      let dayIndex = 0;
      let extraIndex = 0;
      let impIndex = 0;
      let imp2Index = 0;
      let imp3Index = 0;
      let oneDay: ImportantIndexDayData;

      this.dataToDisplay = null;
      this.dataToDisplay = [];
  
      for (let day of this.monthDaysArr) {
        
        oneDay = new ImportantIndexDayData();
  
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
  
        if (this.indexData['importantDTO'][impIndex]) {
          if (day === this.indexData['importantDTO'][impIndex].startDate[2]) {
            oneDay.importantDTO = this.indexData['importantDTO'][impIndex];
            impIndex++;
          } else {
            oneDay.importantDTO = null;
          }
        }
  
        if (this.indexData['important2DTO'][imp2Index]) {
          if (day === this.indexData['important2DTO'][imp2Index].startDate[2]) {
            oneDay.important2DTO = this.indexData['important2DTO'][imp2Index];
            imp2Index++;
          } else {
            oneDay.important2DTO = null;
          }
        }
  
        if (this.indexData['important3DTO'][imp3Index]) {
          if (day === this.indexData['important3DTO'][imp3Index].startDate[2]) {
            oneDay.important3DTO = this.indexData['important3DTO'][imp3Index];
            imp3Index++;
          } else {
            oneDay.important3DTO = null;
          }
        }
  
        this.dataToDisplay.push(oneDay);
      }
    }
}
