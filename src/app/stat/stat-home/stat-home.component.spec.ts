import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatHomeComponent } from './stat-home.component';

describe('StatHomeComponent', () => {
  let component: StatHomeComponent;
  let fixture: ComponentFixture<StatHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
