import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionDashboardComponent } from './preinspection-dashboard.component';

describe('PreinspectionDashboardComponent', () => {
  let component: PreinspectionDashboardComponent;
  let fixture: ComponentFixture<PreinspectionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
