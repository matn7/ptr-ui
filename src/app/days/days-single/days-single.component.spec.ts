import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysSingleComponent } from './days-single.component';

describe('DaysSingleComponent', () => {
  let component: DaysSingleComponent;
  let fixture: ComponentFixture<DaysSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
