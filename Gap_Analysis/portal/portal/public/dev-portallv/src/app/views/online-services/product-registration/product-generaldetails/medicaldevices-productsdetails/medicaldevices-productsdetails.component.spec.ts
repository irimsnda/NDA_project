import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldevicesProductsdetailsComponent } from './medicaldevices-productsdetails.component';

describe('MedicaldevicesProductsdetailsComponent', () => {
  let component: MedicaldevicesProductsdetailsComponent;
  let fixture: ComponentFixture<MedicaldevicesProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldevicesProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldevicesProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
