import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEvaluationComponent } from './product-evaluation.component';

describe('ProductEvaluationComponent', () => {
  let component: ProductEvaluationComponent;
  let fixture: ComponentFixture<ProductEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
