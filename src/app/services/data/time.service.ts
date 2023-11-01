import { Injectable } from "@angular/core";
import { MessagesService } from "./messages.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class TimeService {
    selectedDate: Date;
    today: number;

    constructor(
        private messagesService: MessagesService,
        private router: Router) { }

    checkDateInFuture(year: number, month: number, day: number, returnUrl: string) {
        this.selectedDate = new Date();
        this.selectedDate.setFullYear(year);
        this.selectedDate.setMonth(month - 1);
        this.selectedDate.setDate(day);
        this.today = Date.now();

        if (!(this.today >= this.selectedDate.getTime())) {
            this.handleErrorMessage(returnUrl);
        }
    }

    private handleErrorMessage(returnUrl: string) {
        console.log("Handle Error Message in TimeService");
        this.messagesService.triggerMsgsFromBackend(
            ["Date in future"]
        );
        this.router.navigate([returnUrl]);
    }

    getActiveDay(month: number, year: number, date: Date) {
        if (month == date.getMonth() + 1 && year == date.getFullYear()) {
            return date.getDate();
        } else if (
            (month > date.getMonth() + 1 && year == date.getFullYear()) ||
            year > date.getFullYear()
        ) {
            return -2;
        } else {
            return -1;
        }
    }

    checkFutureDate(day: number, date: Date) {
        if (day > date.getDate() || day <= 0) {
            return -1;
        }
    }

    checkNumber(num: number) {
        if (num === 1 || num === 2 || num === 3) {
            return 0;
        }
        return -1;
    }
}
