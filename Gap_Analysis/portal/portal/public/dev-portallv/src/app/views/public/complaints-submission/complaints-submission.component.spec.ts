import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsSubmissionComponent } from './complaints-submission.component';

describe('ComplaintsSubmissionComponent', () => {
  let component: ComplaintsSubmissionComponent;
  let fixture: ComponentFixture<ComplaintsSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
