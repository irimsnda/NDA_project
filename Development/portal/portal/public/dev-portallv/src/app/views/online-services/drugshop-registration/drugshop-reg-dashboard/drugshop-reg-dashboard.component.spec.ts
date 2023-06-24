import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopRegDashboardComponent } from './drugshop-reg-dashboard.component';

describe('DrugshopRegDashboardComponent', () => {
  let component: DrugshopRegDashboardComponent;
  let fixture: ComponentFixture<DrugshopRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
