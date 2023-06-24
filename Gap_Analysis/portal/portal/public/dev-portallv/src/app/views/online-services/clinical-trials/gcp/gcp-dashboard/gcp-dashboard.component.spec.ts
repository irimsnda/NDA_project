import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpDashboardComponent } from './gcp-dashboard.component';

describe('GcpDashboardComponent', () => {
  let component: GcpDashboardComponent;
  let fixture: ComponentFixture<GcpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
