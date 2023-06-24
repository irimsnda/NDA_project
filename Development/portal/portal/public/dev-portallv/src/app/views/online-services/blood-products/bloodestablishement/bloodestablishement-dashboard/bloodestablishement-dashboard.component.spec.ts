import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodestablishementDashboardComponent } from './bloodestablishement-dashboard.component';

describe('BloodestablishementDashboardComponent', () => {
  let component: BloodestablishementDashboardComponent;
  let fixture: ComponentFixture<BloodestablishementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodestablishementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodestablishementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
