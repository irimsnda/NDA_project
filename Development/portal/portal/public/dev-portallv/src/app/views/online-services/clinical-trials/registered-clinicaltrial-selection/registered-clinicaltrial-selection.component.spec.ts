import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClinicaltrialSelectionComponent } from './registered-clinicaltrial-selection.component';

describe('RegisteredClinicaltrialSelectionComponent', () => {
  let component: RegisteredClinicaltrialSelectionComponent;
  let fixture: ComponentFixture<RegisteredClinicaltrialSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredClinicaltrialSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredClinicaltrialSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
