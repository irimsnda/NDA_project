import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsappSubmissionsComponent } from './productsapp-submissions.component';

describe('ProductsappSubmissionsComponent', () => {
  let component: ProductsappSubmissionsComponent;
  let fixture: ComponentFixture<ProductsappSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsappSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsappSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
