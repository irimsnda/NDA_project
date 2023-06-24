import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpRegDashboardComponent } from './gmp-reg-dashboard.component';

describe('GmpRegDashboardComponent', () => {
  let component: GmpRegDashboardComponent;
  let fixture: ComponentFixture<GmpRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
