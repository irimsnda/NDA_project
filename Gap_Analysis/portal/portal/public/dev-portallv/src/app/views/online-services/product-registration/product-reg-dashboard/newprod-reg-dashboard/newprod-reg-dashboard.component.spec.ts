import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprodRegDashboardComponent } from './newprod-reg-dashboard.component';

describe('NewprodRegDashboardComponent', () => {
  let component: NewprodRegDashboardComponent;
  let fixture: ComponentFixture<NewprodRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprodRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprodRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
