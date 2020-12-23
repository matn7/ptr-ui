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
import { TaskIndexNewComponent } from 'src/app/task-index-new.component ';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';
import { AppInternalMessagesService } from 'src/app/services/data/app-internal-messages.service';
import { TaskServiceInterface } from 'src/app/services/task.service-interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-important-index-new',
  templateUrl: './important-index-new.component.html',
  styleUrls: ['./important-index-new.component.css']
})
export class ImportantIndexNewComponent extends TaskIndexNewComponent {

  indexDataFinal: ImportantIndexClass[] = [];

  constructor(
    route: ActivatedRoute,
    importantIndexService: ImportantService, 
    authService: AuthenticationService,
    timeService: TimeService,
    router : Router,
    customErrorMsgService: CustomErrorMessageService
    ) { 
      super(route, importantIndexService, authService, timeService, router, 
        customErrorMsgService, "important", new ImportantIndex()[31]);
    }

    processData() {
      console.log("Init data here");
      let dayIndex = 0;
      let extraIndex = 0;
      let impIndex = 0;
      let imp2Index = 0;
      let imp3Index = 0;
      let oneObject: ImportantIndexClass;
  
      for (let entry of this.numbers) {
        
        oneObject = new ImportantIndexClass();
  
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
  
        if (this.indexData['importantDTO'][impIndex]) {
          if (entry === this.indexData['importantDTO'][impIndex].startDate[2]) {
            oneObject.importantDTO = this.indexData['importantDTO'][impIndex];
            impIndex++;
          } else {
            oneObject.importantDTO = null;
          }
        }
  
        if (this.indexData['important2DTO'][imp2Index]) {
          if (entry === this.indexData['important2DTO'][imp2Index].startDate[2]) {
            oneObject.important2DTO = this.indexData['important2DTO'][imp2Index];
            imp2Index++;
          } else {
            oneObject.important2DTO = null;
          }
        }
  
        if (this.indexData['important3DTO'][imp3Index]) {
          if (entry === this.indexData['important3DTO'][imp3Index].startDate[2]) {
            oneObject.important3DTO = this.indexData['important3DTO'][imp3Index];
            imp3Index++;
          } else {
            oneObject.important3DTO = null;
          }
        }
  
        this.indexDataFinal.push(oneObject);
  
      }
    }
}
