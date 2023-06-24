import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldevicesPremisesComponent } from './medicaldevices-premises.component';

describe('MedicaldevicesPremisesComponent', () => {
  let component: MedicaldevicesPremisesComponent;
  let fixture: ComponentFixture<MedicaldevicesPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldevicesPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldevicesPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
