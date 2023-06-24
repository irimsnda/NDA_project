import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionBookingComponent } from './inspection-booking.component';

describe('InspectionBookingComponent', () => {
  let component: InspectionBookingComponent;
  let fixture: ComponentFixture<InspectionBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
