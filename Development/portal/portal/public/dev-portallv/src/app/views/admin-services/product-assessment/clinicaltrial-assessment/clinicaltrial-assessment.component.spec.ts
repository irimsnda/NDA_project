import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialAssessmentComponent } from './clinicaltrial-assessment.component';

describe('ClinicaltrialAssessmentComponent', () => {
  let component: ClinicaltrialAssessmentComponent;
  let fixture: ComponentFixture<ClinicaltrialAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
