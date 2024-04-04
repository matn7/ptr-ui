import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DATE_FORMAT, DETAIL_DATE_FORMAT } from "../app.constants";
import { TimeService } from "./data/time.service";
import { MessagesService } from "./data/messages.service";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class CommonService {

    startDate: string;
    postedOn: string;
    formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private datepipe: DatePipe,
        private timeService: TimeService,
        private messagesService: MessagesService
    ) {
    }

    setFormGroup(formGroup: FormGroup) {
        this.formGroup = formGroup;
    }


    uriDateValidator(day: number, month: number, year: number, returnUrl: string) {
        console.log('Majka Majka Majka v2');
        console.log(day);
        this.route.params.subscribe(
            params => {
                day = +params["day"];
                month = +params["month"];
                year = +params["year"];
                this.startDate = this.datepipe.transform(
                    new Date(year, month - 1, day),
                    DATE_FORMAT
                );
                this.postedOn = this.datepipe.transform(
                    new Date(),
                    DETAIL_DATE_FORMAT
                );
            },
            error => {
                this.displayError(error);
            }
        );

        this.timeService.checkDateInFuture(year, month, day, returnUrl);
    }

    private displayError(error) {
        this.messagesService.displayError(error, this.formGroup);
    }
}