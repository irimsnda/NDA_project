import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClinicaltrialComponent } from './registered-clinicaltrial.component';

describe('RegisteredClinicaltrialComponent', () => {
  let component: RegisteredClinicaltrialComponent;
  let fixture: ComponentFixture<RegisteredClinicaltrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredClinicaltrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredClinicaltrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
