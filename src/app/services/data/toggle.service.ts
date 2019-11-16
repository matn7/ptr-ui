import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ToggleService {
  isUserActive;
  isImportantActive;
  isLessImportantActive;
  isStatisticsActive;

  isGreenActive;
  isYellowActive;
  isBlueActive;

  isHeaderClicked;

  @Output() changeUser: EventEmitter<boolean> = new EventEmitter();
  @Output() changeImportant: EventEmitter<boolean> = new EventEmitter();
  @Output() changeLessImportant: EventEmitter<boolean> = new EventEmitter();
  @Output() changeDays: EventEmitter<boolean> = new EventEmitter();
  @Output() changeStatistics: EventEmitter<boolean> = new EventEmitter();

  @Output() changeGreenActive: EventEmitter<boolean> = new EventEmitter();
  @Output() changeYellowActive: EventEmitter<boolean> = new EventEmitter();
  @Output() changeBlueActive: EventEmitter<boolean> = new EventEmitter();

  @Output() changeClickedHeader: EventEmitter<boolean> = new EventEmitter();

  toggleUser() {
    this.deActivateAll();
    this.isUserActive = true;
    this.emitAll();
  }

  toggleImportant() {
    this.deActivateAll();
    this.isImportantActive = true;
    this.emitAll();
  }

  toggleLessImportant() {
    this.deActivateAll();
    this.isLessImportantActive = true;
    this.emitAll();
  }

  toggleDays() {
    this.deActivateAll();
    this.emitAll();
  }

  toggleStatistics() {
    this.deActivateAll();
    this.isStatisticsActive = true;
    this.emitAll();
  }

  toggleExtraordinary() {
    this.deActivateAll();
    this.emitAll();
  }

  private emitAll() {
    this.changeUser.emit(this.isUserActive);
    this.changeImportant.emit(this.isImportantActive);
    this.changeLessImportant.emit(this.isLessImportantActive);
    this.changeStatistics.emit(this.isStatisticsActive);
  }

  private deActivateAll() {
    this.isUserActive = false;
    this.isImportantActive = false;
    this.isLessImportantActive = false;
    this.isStatisticsActive = false;
  }

  toggleGreen() {
    this.isGreenActive = true;
    this.isYellowActive = false;
    this.isBlueActive = false;

    this.changeGreenActive.emit(this.isGreenActive);
    this.changeYellowActive.emit(this.isYellowActive);
    this.changeBlueActive.emit(this.isBlueActive);
  }

  toggleYellow() {
    this.isGreenActive = false;
    this.isYellowActive = true;
    this.isBlueActive = false;

    this.changeGreenActive.emit(this.isGreenActive);
    this.changeYellowActive.emit(this.isYellowActive);
    this.changeBlueActive.emit(this.isBlueActive);
  }

  toggleBlue() {
    this.isGreenActive = false;
    this.isYellowActive = false;
    this.isBlueActive = true;

    this.changeGreenActive.emit(this.isGreenActive);
    this.changeYellowActive.emit(this.isYellowActive);
    this.changeBlueActive.emit(this.isBlueActive);
  }

  toggleHeaderClicked() {
    this.isHeaderClicked = true;
    this.changeClickedHeader.emit(this.isHeaderClicked);
  }
}
