import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesRegistrationselectionComponent } from './premises-registrationselection.component';

describe('PremisesRegistrationselectionComponent', () => {
  let component: PremisesRegistrationselectionComponent;
  let fixture: ComponentFixture<PremisesRegistrationselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesRegistrationselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesRegistrationselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
