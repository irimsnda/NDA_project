import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductnotificationDashboardComponent } from './productnotification-dashboard.component';

describe('ProductnotificationDashboardComponent', () => {
  let component: ProductnotificationDashboardComponent;
  let fixture: ComponentFixture<ProductnotificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductnotificationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductnotificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
