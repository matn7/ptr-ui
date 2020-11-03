import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Index } from 'src/app/index.model.';
import { ImportantService, ImportantIndex, DaysDTO, ExtraordinaryDTO, ImportantIndexClass } from 'src/app/services/important.service.';
import { ActivatedRoute } from '@angular/router';
import { CustomErrorMessageService } from 'src/app/services/data/custom-error-message.service';

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
  extraordinaryIndex: ExtraordinaryDTO[] = [];
  daysIndex: DaysDTO[] = [];
  oneObject: ImportantIndexClass;
  month: number;
  year: number;
  returnUrl: string;
  numbers: Array<number>;
  daysInMonth: number;
  firstElement: number;
  indexElement: number = 0;

  constructor(
    private route: ActivatedRoute,
    private importantIndexService: ImportantService, 
    private authService: AuthenticationService,
    private customErrorMsgService: CustomErrorMessageService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.month = +params["month"];
      this.year = +params["year"];
    });

    this.daysInMonth = new Date(this.year, this.month, 0).getDate();

    this.numbers = Array(this.daysInMonth)
    .fill(0)
    .map((x, i) => i);

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
    console.log("===> " + this.importantIndex['daysDTO'][dayIndex].startDate[2]);

    for (let entry of this.numbers) {
      this.oneObject = new ImportantIndexClass();

      if (this.importantIndex['daysDTO'][dayIndex]) { 
        if (entry === this.importantIndex['daysDTO'][dayIndex].startDate[2]) {
          console.log("Znaleziono daysDTO");
          
          this.daysIndex.push(this.importantIndex['daysDTO'][dayIndex]);
          this.oneObject.daysDTO = this.importantIndex['daysDTO'][dayIndex];
          dayIndex++;
        } else {
          console.log("Nie znaleziono daysDTO dodaj null");
          this.daysIndex.push(null);
          this.oneObject.daysDTO = null;
        }
      }
      
      if (this.importantIndex['extraordinaryDTO'][extraIndex]) {
        if (entry === this.importantIndex['extraordinaryDTO'][extraIndex].startDate[2]) {
          console.log("Znalezione extraordinaryDTO");

          this.extraordinaryIndex.push(this.importantIndex['extraordinaryDTO'][extraIndex]);
          this.oneObject.extraordinaryDTO = this.importantIndex['extraordinaryDTO'][extraIndex];
          extraIndex++;
        } else {
          console.log("Nie znaleziono extraordinaryDTO dodaj null");
          this.extraordinaryIndex.push(null);
          this.oneObject.extraordinaryDTO = null;
        }
      }

      this.importantIndexFinal.push(this.oneObject);

    }
    console.log("Final index");
    console.log(this.daysIndex);
    console.log(this.extraordinaryIndex);
    console.log("Important Index Final =====================>");
    console.log(this.importantIndexFinal);
  }

}
