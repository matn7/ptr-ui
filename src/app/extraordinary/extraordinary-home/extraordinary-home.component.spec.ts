import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraordinaryHomeComponent } from './extraordinary-home.component';

describe('ExtraordinaryHomeComponent', () => {
  let component: ExtraordinaryHomeComponent;
  let fixture: ComponentFixture<ExtraordinaryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraordinaryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraordinaryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
