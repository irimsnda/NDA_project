import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopLicensedetailsComponent } from './drugshop-licensedetails.component';

describe('DrugshopLicensedetailsComponent', () => {
  let component: DrugshopLicensedetailsComponent;
  let fixture: ComponentFixture<DrugshopLicensedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopLicensedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopLicensedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
