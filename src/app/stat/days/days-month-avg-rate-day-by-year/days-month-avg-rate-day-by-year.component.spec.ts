import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysMonthAvgRateDayByYearComponent } from './days-month-avg-rate-day-by-year.component';

describe('DaysMonthAvgRateDayByYearComponent', () => {
  let component: DaysMonthAvgRateDayByYearComponent;
  let fixture: ComponentFixture<DaysMonthAvgRateDayByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysMonthAvgRateDayByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysMonthAvgRateDayByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
