import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialProgressreportingComponent } from './clinicaltrial-progressreporting.component';

describe('ClinicaltrialProgressreportingComponent', () => {
  let component: ClinicaltrialProgressreportingComponent;
  let fixture: ComponentFixture<ClinicaltrialProgressreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialProgressreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialProgressreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
