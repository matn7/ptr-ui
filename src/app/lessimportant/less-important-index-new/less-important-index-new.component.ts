import { Component, OnInit } from '@angular/core';
import { LessImportantService, LessImportantIndex, LessImportantIndexClass } from 'src/app/services/less-important.service.';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TimeService } from 'src/app/services/data/time.service';
import { CustomErrorMessageService } from 'src/app/services/data/custom-error-message.service';
import { TaskIndexNewComponent } from 'src/app/task-index-new.component ';

@Component({
  selector: 'app-less-important-index-new',
  templateUrl: './less-important-index-new.component.html',
  styleUrls: ['./less-important-index-new.component.css']
})
export class LessImportantIndexNewComponent extends TaskIndexNewComponent {

  constructor(
    route: ActivatedRoute,
    indexService: LessImportantService, 
    authService: AuthenticationService,
    timeService: TimeService,
    router: Router,
    customErrorMsgService: CustomErrorMessageService
    ) { 
      super(route, indexService, authService, timeService, router, customErrorMsgService, 
        "lessimportant", new LessImportantIndex()[31]);
    }

    processData() {
      let dayIndex = 0;
      let extraIndex = 0;
      let impIndex = 0;
      let imp2Index = 0;
      let imp3Index = 0;
      let oneObject: LessImportantIndexClass;
  
      for (let entry of this.numbers) {
        
        oneObject = new LessImportantIndexClass();
  
        if (this.indexData['extraordinaryDTO'][extraIndex]) {
          if (entry === this.indexData['extraordinaryDTO'][extraIndex].startDate[2]) {
            oneObject.extraordinaryDTO = this.indexData['extraordinaryDTO'][extraIndex];
            extraIndex++;
          } else {
            oneObject.extraordinaryDTO = null;
          }
        }
  
        if (this.indexData['daysDTO'][dayIndex]) {
          if (entry === this.indexData['daysDTO'][dayIndex].startDate[2]) {
            oneObject.daysDTO = this.indexData['daysDTO'][dayIndex];
            dayIndex++;
          } else {
            oneObject.daysDTO = null;
          }
        }
  
        if (this.indexData['lessImportantDTO'][impIndex]) {
          if (entry === this.indexData['lessImportantDTO'][impIndex].startDate[2]) {
            oneObject.lessImportantDTO = this.indexData['lessImportantDTO'][impIndex];
            impIndex++;
          } else {
            oneObject.lessImportantDTO = null;
          }
        }
  
        if (this.indexData['lessImportant2DTO'][imp2Index]) {
          if (entry === this.indexData['lessImportant2DTO'][imp2Index].startDate[2]) {
            oneObject.lessImportant2DTO = this.indexData['lessImportant2DTO'][imp2Index];
            imp2Index++;
          } else {
            oneObject.lessImportant2DTO = null;
          }
        }
  
        if (this.indexData['lessImportant3DTO'][imp3Index]) {
          if (entry === this.indexData['lessImportant3DTO'][imp3Index].startDate[2]) {
            oneObject.lessImportant3DTO = this.indexData['lessImportant3DTO'][imp3Index];
            imp3Index++;
          } else {
            oneObject.lessImportant3DTO = null;
          }
        }
  
        this.indexDataFinal.push(oneObject);
  
      }
    }

}
