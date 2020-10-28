import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantIndexNewComponent } from './important-index-new.component';

describe('ImportantIndexNewComponent', () => {
  let component: ImportantIndexNewComponent;
  let fixture: ComponentFixture<ImportantIndexNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantIndexNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantIndexNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
