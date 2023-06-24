import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPremisesRegistrationComponent } from './new-premises-registration.component';

describe('NewPremisesRegistrationComponent', () => {
  let component: NewPremisesRegistrationComponent;
  let fixture: ComponentFixture<NewPremisesRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPremisesRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPremisesRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
