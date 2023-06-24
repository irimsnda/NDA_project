import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialprogressrptDashboardComponent } from './clinicaltrialprogressrpt-dashboard.component';

describe('ClinicaltrialprogressrptDashboardComponent', () => {
  let component: ClinicaltrialprogressrptDashboardComponent;
  let fixture: ComponentFixture<ClinicaltrialprogressrptDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialprogressrptDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialprogressrptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
