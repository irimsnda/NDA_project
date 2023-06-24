import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAuditDashboardComponent } from './quality-audit-dashboard.component';

describe('QualityAuditDashboardComponent', () => {
  let component: QualityAuditDashboardComponent;
  let fixture: ComponentFixture<QualityAuditDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAuditDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAuditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
