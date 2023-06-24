import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalProductsParticularsComponent } from './promotional-products-particulars.component';

describe('PromotionalProductsParticularsComponent', () => {
  let component: PromotionalProductsParticularsComponent;
  let fixture: ComponentFixture<PromotionalProductsParticularsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalProductsParticularsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalProductsParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
