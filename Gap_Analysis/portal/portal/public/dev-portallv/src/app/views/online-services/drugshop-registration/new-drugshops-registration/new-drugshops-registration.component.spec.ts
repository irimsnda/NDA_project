import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDrugshopsRegistrationComponent } from './new-drugshops-registration.component';

describe('NewDrugshopsRegistrationComponent', () => {
  let component: NewDrugshopsRegistrationComponent;
  let fixture: ComponentFixture<NewDrugshopsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDrugshopsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrugshopsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
