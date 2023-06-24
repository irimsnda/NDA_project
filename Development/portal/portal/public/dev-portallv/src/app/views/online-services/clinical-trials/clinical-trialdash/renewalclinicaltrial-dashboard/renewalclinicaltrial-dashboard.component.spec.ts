import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalclinicaltrialDashboardComponent } from './renewalclinicaltrial-dashboard.component';

describe('RenewalclinicaltrialDashboardComponent', () => {
  let component: RenewalclinicaltrialDashboardComponent;
  let fixture: ComponentFixture<RenewalclinicaltrialDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalclinicaltrialDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalclinicaltrialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
