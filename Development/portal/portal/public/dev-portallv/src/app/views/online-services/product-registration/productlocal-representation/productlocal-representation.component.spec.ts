import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlocalRepresentationComponent } from './productlocal-representation.component';

describe('ProductlocalRepresentationComponent', () => {
  let component: ProductlocalRepresentationComponent;
  let fixture: ComponentFixture<ProductlocalRepresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlocalRepresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlocalRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
