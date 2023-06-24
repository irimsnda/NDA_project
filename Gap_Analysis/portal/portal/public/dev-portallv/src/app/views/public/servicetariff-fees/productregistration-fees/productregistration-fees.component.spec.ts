import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductregistrationFeesComponent } from './productregistration-fees.component';

describe('ProductregistrationFeesComponent', () => {
  let component: ProductregistrationFeesComponent;
  let fixture: ComponentFixture<ProductregistrationFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductregistrationFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductregistrationFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
