import { Component } from '@angular/core';
import { LessImportantService, LessImportantIndex, LessImportantIndexDayData } from 'src/app/lessimportant/less-important.service.';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { TimeService } from 'src/app/services/data/time.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { TaskIndexNewComponent } from 'src/app/task-index-new.component';

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

    custom_sort(a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
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

        console.log("Sort retrieved from backend data based on startDate");
        this.indexData['extraordinaryDTO'].sort(this.custom_sort);
        this.indexData['taskDTO'].sort(this.custom_sort);
        this.indexData['task2DTO'].sort(this.custom_sort);
        this.indexData['task3DTO'].sort(this.custom_sort);
        this.indexData['daysDTO'].sort(this.custom_sort);

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

            if (this.indexData['taskDTO'][impIndex]) {
                if (day === this.indexData['taskDTO'][impIndex].startDate[2]) {
                    oneDay.taskDTO = this.indexData['taskDTO'][impIndex];
                    impIndex++;
                } else {
                    oneDay.taskDTO = null;
                }
            }

            if (this.indexData['task2DTO'][imp2Index]) {
                if (day === this.indexData['task2DTO'][imp2Index].startDate[2]) {
                    oneDay.task2DTO = this.indexData['task2DTO'][imp2Index];
                    imp2Index++;
                } else {
                    oneDay.task2DTO = null;
                }
            }

            if (this.indexData['task3DTO'][imp3Index]) {
                if (day === this.indexData['task3DTO'][imp3Index].startDate[2]) {
                    oneDay.task3DTO = this.indexData['task3DTO'][imp3Index];
                    imp3Index++;
                } else {
                    oneDay.task3DTO = null;
                }
            }

            this.dataToDisplay.push(oneDay);

        }

        console.log("----------------");
        console.log(this.dataToDisplay);
        console.log("----------------");
    }

}
