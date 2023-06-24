import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpDocumentSubmissionComponent } from './gmp-document-submission.component';

describe('GmpDocumentSubmissionComponent', () => {
  let component: GmpDocumentSubmissionComponent;
  let fixture: ComponentFixture<GmpDocumentSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpDocumentSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpDocumentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
