import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraordinaryListComponent } from './extraordinary-list.component';

describe('ExtraordinaryListComponent', () => {
  let component: ExtraordinaryListComponent;
  let fixture: ComponentFixture<ExtraordinaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraordinaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraordinaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
