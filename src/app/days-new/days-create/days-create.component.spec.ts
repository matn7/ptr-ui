import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysCreateComponent } from './days-create.component';

describe('DaysCreateComponent', () => {
  let component: DaysCreateComponent;
  let fixture: ComponentFixture<DaysCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
