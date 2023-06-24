import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredFoodproductsComponent } from './registered-foodproducts.component';

describe('RegisteredFoodproductsComponent', () => {
  let component: RegisteredFoodproductsComponent;
  let fixture: ComponentFixture<RegisteredFoodproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredFoodproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredFoodproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
