import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegDashboardComponent } from './product-reg-dashboard.component';

describe('ProductRegDashboardComponent', () => {
  let component: ProductRegDashboardComponent;
  let fixture: ComponentFixture<ProductRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
