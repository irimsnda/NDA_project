import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopsRegistrationselectionComponent } from './drugshops-registrationselection.component';

describe('DrugshopsRegistrationselectionComponent', () => {
  let component: DrugshopsRegistrationselectionComponent;
  let fixture: ComponentFixture<DrugshopsRegistrationselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopsRegistrationselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopsRegistrationselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
