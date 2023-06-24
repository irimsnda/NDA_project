import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductformDetailsComponent } from './productform-details.component';

describe('ProductformDetailsComponent', () => {
  let component: ProductformDetailsComponent;
  let fixture: ComponentFixture<ProductformDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductformDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductformDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
