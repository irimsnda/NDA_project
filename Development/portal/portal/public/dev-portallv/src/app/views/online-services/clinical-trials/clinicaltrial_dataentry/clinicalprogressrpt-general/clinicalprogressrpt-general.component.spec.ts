import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalprogressrptGeneralComponent } from './clinicalprogressrpt-general.component';

describe('ClinicalprogressrptGeneralComponent', () => {
  let component: ClinicalprogressrptGeneralComponent;
  let fixture: ComponentFixture<ClinicalprogressrptGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalprogressrptGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalprogressrptGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
