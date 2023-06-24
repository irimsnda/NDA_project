import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalGeneraldetailsComponent } from './clinical-generaldetails.component';

describe('ClinicalGeneraldetailsComponent', () => {
  let component: ClinicalGeneraldetailsComponent;
  let fixture: ComponentFixture<ClinicalGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
