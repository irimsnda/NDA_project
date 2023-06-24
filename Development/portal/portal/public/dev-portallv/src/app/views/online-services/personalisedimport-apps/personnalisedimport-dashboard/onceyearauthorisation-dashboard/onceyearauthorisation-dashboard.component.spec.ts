import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnceyearauthorisationDashboardComponent } from './onceyearauthorisation-dashboard.component';

describe('OnceyearauthorisationDashboardComponent', () => {
  let component: OnceyearauthorisationDashboardComponent;
  let fixture: ComponentFixture<OnceyearauthorisationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnceyearauthorisationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnceyearauthorisationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
