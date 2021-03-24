import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessImportantHomeComponent } from './less-important-home.component';

describe('LessImportantHomeComponent', () => {
  let component: LessImportantHomeComponent;
  let fixture: ComponentFixture<LessImportantHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessImportantHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessImportantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
