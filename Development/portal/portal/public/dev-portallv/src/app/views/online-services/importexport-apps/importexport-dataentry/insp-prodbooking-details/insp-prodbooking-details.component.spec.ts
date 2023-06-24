import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspProdbookingDetailsComponent } from './insp-prodbooking-details.component';

describe('InspProdbookingDetailsComponent', () => {
  let component: InspProdbookingDetailsComponent;
  let fixture: ComponentFixture<InspProdbookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspProdbookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspProdbookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
