import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhibitedProductsComponent } from './prohibited-products.component';

describe('ProhibitedProductsComponent', () => {
  let component: ProhibitedProductsComponent;
  let fixture: ComponentFixture<ProhibitedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProhibitedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProhibitedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
