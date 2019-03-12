import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TimeService {
  constructor() {}

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
}
