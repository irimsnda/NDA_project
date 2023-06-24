import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApplicationPreviewComponent } from './product-application-preview.component';

describe('ProductApplicationPreviewComponent', () => {
  let component: ProductApplicationPreviewComponent;
  let fixture: ComponentFixture<ProductApplicationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductApplicationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApplicationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
