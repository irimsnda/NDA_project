import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialammendmentComponent } from './clinical-trialammendment.component';

describe('ClinicalTrialammendmentComponent', () => {
  let component: ClinicalTrialammendmentComponent;
  let fixture: ComponentFixture<ClinicalTrialammendmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalTrialammendmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialammendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
