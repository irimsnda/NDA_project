import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialDocumentsubmissionComponent } from './clinicaltrial-documentsubmission.component';

describe('ClinicaltrialDocumentsubmissionComponent', () => {
  let component: ClinicaltrialDocumentsubmissionComponent;
  let fixture: ComponentFixture<ClinicaltrialDocumentsubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialDocumentsubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialDocumentsubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
