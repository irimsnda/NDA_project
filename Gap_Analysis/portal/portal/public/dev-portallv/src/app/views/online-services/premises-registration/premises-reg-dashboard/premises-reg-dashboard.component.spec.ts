import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesRegDashboardComponent } from './premises-reg-dashboard.component';

describe('PremisesRegDashboardComponent', () => {
  let component: PremisesRegDashboardComponent;
  let fixture: ComponentFixture<PremisesRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
