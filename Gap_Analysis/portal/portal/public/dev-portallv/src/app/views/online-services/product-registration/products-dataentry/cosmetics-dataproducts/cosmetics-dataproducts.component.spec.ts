import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsDataproductsComponent } from './cosmetics-dataproducts.component';

describe('CosmeticsDataproductsComponent', () => {
  let component: CosmeticsDataproductsComponent;
  let fixture: ComponentFixture<CosmeticsDataproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmeticsDataproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticsDataproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
