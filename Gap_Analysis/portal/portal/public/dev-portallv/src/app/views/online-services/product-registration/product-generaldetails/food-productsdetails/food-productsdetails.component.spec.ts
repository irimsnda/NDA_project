import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProductsdetailsComponent } from './food-productsdetails.component';

describe('FoodProductsdetailsComponent', () => {
  let component: FoodProductsdetailsComponent;
  let fixture: ComponentFixture<FoodProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
