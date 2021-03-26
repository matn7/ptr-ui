import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysHomeComponent } from './days-home.component';

describe('DaysHomeComponent', () => {
  let component: DaysHomeComponent;
  let fixture: ComponentFixture<DaysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
