import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldeviceDataproductsComponent } from './medicaldevice-dataproducts.component';

describe('MedicaldeviceDataproductsComponent', () => {
  let component: MedicaldeviceDataproductsComponent;
  let fixture: ComponentFixture<MedicaldeviceDataproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldeviceDataproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldeviceDataproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
