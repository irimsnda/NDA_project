import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuppydangerousApplicationComponent } from './order-suppydangerous-application.component';

describe('OrderSuppydangerousApplicationComponent', () => {
  let component: OrderSuppydangerousApplicationComponent;
  let fixture: ComponentFixture<OrderSuppydangerousApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuppydangerousApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuppydangerousApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
