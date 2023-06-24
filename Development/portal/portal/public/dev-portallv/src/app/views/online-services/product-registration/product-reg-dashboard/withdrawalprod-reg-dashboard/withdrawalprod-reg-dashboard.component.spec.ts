import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalprodRegDashboardComponent } from './withdrawalprod-reg-dashboard.component';

describe('WithdrawalprodRegDashboardComponent', () => {
  let component: WithdrawalprodRegDashboardComponent;
  let fixture: ComponentFixture<WithdrawalprodRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalprodRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalprodRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
