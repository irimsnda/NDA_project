import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsubmissionDashboardComponent } from './appsubmission-dashboard.component';

describe('AppsubmissionDashboardComponent', () => {
  let component: AppsubmissionDashboardComponent;
  let fixture: ComponentFixture<AppsubmissionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsubmissionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsubmissionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
