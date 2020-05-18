import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TimeService {
  selectedDate: Date;
  today: number;

  constructor() {}

  checkDateInFuture(year: number, month: number, day: number) {
    this.selectedDate = new Date();
    this.selectedDate.setFullYear(year);
    this.selectedDate.setMonth(month-1);
    this.selectedDate.setDate(day);
    this.today = Date.now();
    
    return !(this.today >= this.selectedDate.getTime());
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
