import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductnotificationSelComponent } from './productnotification-sel.component';

describe('ProductnotificationSelComponent', () => {
  let component: ProductnotificationSelComponent;
  let fixture: ComponentFixture<ProductnotificationSelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductnotificationSelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductnotificationSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
