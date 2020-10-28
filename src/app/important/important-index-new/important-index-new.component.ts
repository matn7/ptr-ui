import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Index } from 'src/app/index.model.';
import { ImportantService, ImportantIndex } from 'src/app/services/important.service.';
import { ActivatedRoute } from '@angular/router';
import { CustomErrorMessageService } from 'src/app/services/data/custom-error-message.service';

@Component({
  selector: 'app-important-index-new',
  templateUrl: './important-index-new.component.html',
  styleUrls: ['./important-index-new.component.css']
})
export class ImportantIndexNewComponent implements OnInit {

  username: string;
  importantIndex: ImportantIndex[];
  month: number;
  year: number;
  returnUrl: string;
  numbers: Array<number>;
  daysInMonth: number;

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
          console.log(this.importantIndex);
        }
    );
  }

}
