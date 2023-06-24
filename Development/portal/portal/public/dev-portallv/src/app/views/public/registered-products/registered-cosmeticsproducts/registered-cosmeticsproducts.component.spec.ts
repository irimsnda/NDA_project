import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCosmeticsproductsComponent } from './registered-cosmeticsproducts.component';

describe('RegisteredCosmeticsproductsComponent', () => {
  let component: RegisteredCosmeticsproductsComponent;
  let fixture: ComponentFixture<RegisteredCosmeticsproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCosmeticsproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCosmeticsproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
