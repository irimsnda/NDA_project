import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImagesdocumentsComponent } from './products-imagesdocuments.component';

describe('ProductsImagesdocumentsComponent', () => {
  let component: ProductsImagesdocumentsComponent;
  let fixture: ComponentFixture<ProductsImagesdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsImagesdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsImagesdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
