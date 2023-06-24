import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistrationselectionComponent } from './product-registrationselection.component';

describe('ProductRegistrationselectionComponent', () => {
  let component: ProductRegistrationselectionComponent;
  let fixture: ComponentFixture<ProductRegistrationselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRegistrationselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRegistrationselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
