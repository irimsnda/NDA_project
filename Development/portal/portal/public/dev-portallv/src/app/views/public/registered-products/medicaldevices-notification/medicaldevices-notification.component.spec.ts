import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldevicesNotificationComponent } from './medicaldevices-notification.component';

describe('MedicaldevicesNotificationComponent', () => {
  let component: MedicaldevicesNotificationComponent;
  let fixture: ComponentFixture<MedicaldevicesNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldevicesNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldevicesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
