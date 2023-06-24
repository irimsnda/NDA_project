import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuppydangerousDashComponent } from './order-suppydangerous-dash.component';

describe('OrderSuppydangerousDashComponent', () => {
  let component: OrderSuppydangerousDashComponent;
  let fixture: ComponentFixture<OrderSuppydangerousDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuppydangerousDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuppydangerousDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
