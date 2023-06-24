import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNotificationsDashboardComponent } from './product-notifications-dashboard.component';

describe('ProductNotificationsDashboardComponent', () => {
  let component: ProductNotificationsDashboardComponent;
  let fixture: ComponentFixture<ProductNotificationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNotificationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNotificationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
