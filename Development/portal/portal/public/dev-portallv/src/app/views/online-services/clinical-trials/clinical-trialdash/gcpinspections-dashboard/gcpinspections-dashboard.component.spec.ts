import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpinspectionsDashboardComponent } from './gcpinspections-dashboard.component';

describe('GcpinspectionsDashboardComponent', () => {
  let component: GcpinspectionsDashboardComponent;
  let fixture: ComponentFixture<GcpinspectionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcpinspectionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcpinspectionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
