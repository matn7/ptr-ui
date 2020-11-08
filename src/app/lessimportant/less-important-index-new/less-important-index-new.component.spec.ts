import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessImportantIndexNewComponent } from './less-important-index-new.component';

describe('LessImportantIndexNewComponent', () => {
  let component: LessImportantIndexNewComponent;
  let fixture: ComponentFixture<LessImportantIndexNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessImportantIndexNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessImportantIndexNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
