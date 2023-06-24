import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuppydangerousGendetailsComponent } from './order-suppydangerous-gendetails.component';

describe('OrderSuppydangerousGendetailsComponent', () => {
  let component: OrderSuppydangerousGendetailsComponent;
  let fixture: ComponentFixture<OrderSuppydangerousGendetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuppydangerousGendetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuppydangerousGendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
