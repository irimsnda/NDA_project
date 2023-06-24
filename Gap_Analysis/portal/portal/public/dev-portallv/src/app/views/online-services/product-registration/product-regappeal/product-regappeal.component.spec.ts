import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegappealComponent } from './product-regappeal.component';

describe('ProductRegappealComponent', () => {
  let component: ProductRegappealComponent;
  let fixture: ComponentFixture<ProductRegappealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRegappealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRegappealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
