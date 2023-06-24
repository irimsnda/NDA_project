import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionbookingDashboardComponent } from './inspectionbooking-dashboard.component';

describe('InspectionbookingDashboardComponent', () => {
  let component: InspectionbookingDashboardComponent;
  let fixture: ComponentFixture<InspectionbookingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionbookingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionbookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
