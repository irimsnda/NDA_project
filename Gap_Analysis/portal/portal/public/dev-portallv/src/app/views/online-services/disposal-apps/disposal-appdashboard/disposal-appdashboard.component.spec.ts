import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalAppdashboardComponent } from './disposal-appdashboard.component';

describe('DisposalAppdashboardComponent', () => {
  let component: DisposalAppdashboardComponent;
  let fixture: ComponentFixture<DisposalAppdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalAppdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalAppdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
