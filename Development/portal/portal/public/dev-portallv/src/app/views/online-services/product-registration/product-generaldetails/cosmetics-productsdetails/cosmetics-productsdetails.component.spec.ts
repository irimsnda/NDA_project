import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsProductsdetailsComponent } from './cosmetics-productsdetails.component';

describe('CosmeticsProductsdetailsComponent', () => {
  let component: CosmeticsProductsdetailsComponent;
  let fixture: ComponentFixture<CosmeticsProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmeticsProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticsProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
