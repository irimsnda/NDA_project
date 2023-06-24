import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDataproductsComponent } from './food-dataproducts.component';

describe('FoodDataproductsComponent', () => {
  let component: FoodDataproductsComponent;
  let fixture: ComponentFixture<FoodDataproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDataproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDataproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
