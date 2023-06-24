import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspBookingdetailsComponent } from './insp-bookingdetails.component';

describe('InspBookingdetailsComponent', () => {
  let component: InspBookingdetailsComponent;
  let fixture: ComponentFixture<InspBookingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspBookingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspBookingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
