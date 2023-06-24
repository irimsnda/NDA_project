import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltriavariationsDashboardComponent } from './clinicaltriavariations-dashboard.component';

describe('ClinicaltriavariationsDashboardComponent', () => {
  let component: ClinicaltriavariationsDashboardComponent;
  let fixture: ComponentFixture<ClinicaltriavariationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltriavariationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltriavariationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
