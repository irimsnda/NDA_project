import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredProductsComponent } from './registered-products.component';

describe('RegisteredProductsComponent', () => {
  let component: RegisteredProductsComponent;
  let fixture: ComponentFixture<RegisteredProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
