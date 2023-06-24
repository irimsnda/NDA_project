import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredMedicaldevicesComponent } from './registered-medicaldevices.component';

describe('RegisteredMedicaldevicesComponent', () => {
  let component: RegisteredMedicaldevicesComponent;
  let fixture: ComponentFixture<RegisteredMedicaldevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredMedicaldevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredMedicaldevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
