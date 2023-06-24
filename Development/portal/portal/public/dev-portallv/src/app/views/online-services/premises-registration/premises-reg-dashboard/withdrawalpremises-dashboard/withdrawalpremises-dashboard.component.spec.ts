import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalpremisesDashboardComponent } from './withdrawalpremises-dashboard.component';

describe('WithdrawalpremisesDashboardComponent', () => {
  let component: WithdrawalpremisesDashboardComponent;
  let fixture: ComponentFixture<WithdrawalpremisesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalpremisesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalpremisesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
