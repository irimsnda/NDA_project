import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedMedicaldevicesComponent } from './authorised-medicaldevices.component';

describe('AuthorisedMedicaldevicesComponent', () => {
  let component: AuthorisedMedicaldevicesComponent;
  let fixture: ComponentFixture<AuthorisedMedicaldevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedMedicaldevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedMedicaldevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
