import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldevicesNotificationsComponent } from './medicaldevices-notifications.component';

describe('MedicaldevicesNotificationsComponent', () => {
  let component: MedicaldevicesNotificationsComponent;
  let fixture: ComponentFixture<MedicaldevicesNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaldevicesNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaldevicesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
