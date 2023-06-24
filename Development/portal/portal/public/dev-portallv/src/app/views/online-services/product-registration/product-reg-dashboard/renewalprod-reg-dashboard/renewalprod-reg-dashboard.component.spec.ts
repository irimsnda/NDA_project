import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalprodRegDashboardComponent } from './renewalprod-reg-dashboard.component';

describe('RenewalprodRegDashboardComponent', () => {
  let component: RenewalprodRegDashboardComponent;
  let fixture: ComponentFixture<RenewalprodRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalprodRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalprodRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
