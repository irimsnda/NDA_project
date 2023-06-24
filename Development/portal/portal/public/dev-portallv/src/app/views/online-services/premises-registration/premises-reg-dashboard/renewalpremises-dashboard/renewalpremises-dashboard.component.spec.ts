import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalpremisesDashboardComponent } from './renewalpremises-dashboard.component';

describe('RenewalpremisesDashboardComponent', () => {
  let component: RenewalpremisesDashboardComponent;
  let fixture: ComponentFixture<RenewalpremisesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalpremisesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalpremisesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
