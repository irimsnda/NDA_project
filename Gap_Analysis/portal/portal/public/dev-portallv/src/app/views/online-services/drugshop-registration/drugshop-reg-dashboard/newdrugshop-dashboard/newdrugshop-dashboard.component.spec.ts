import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdrugshopDashboardComponent } from './newdrugshop-dashboard.component';

describe('NewdrugshopDashboardComponent', () => {
  let component: NewdrugshopDashboardComponent;
  let fixture: ComponentFixture<NewdrugshopDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdrugshopDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdrugshopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
