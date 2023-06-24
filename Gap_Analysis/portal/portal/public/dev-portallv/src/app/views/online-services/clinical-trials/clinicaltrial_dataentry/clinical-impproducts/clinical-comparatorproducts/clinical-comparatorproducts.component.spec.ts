import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalComparatorproductsComponent } from './clinical-comparatorproducts.component';

describe('ClinicalComparatorproductsComponent', () => {
  let component: ClinicalComparatorproductsComponent;
  let fixture: ComponentFixture<ClinicalComparatorproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalComparatorproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalComparatorproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
