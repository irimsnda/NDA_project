import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialpreviewComponent } from './clinical-trialpreview.component';

describe('ClinicalTrialpreviewComponent', () => {
  let component: ClinicalTrialpreviewComponent;
  let fixture: ComponentFixture<ClinicalTrialpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalTrialpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
