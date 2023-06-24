import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalPlacabolproductsComponent } from './clinical-placabolproducts.component';

describe('ClinicalPlacabolproductsComponent', () => {
  let component: ClinicalPlacabolproductsComponent;
  let fixture: ComponentFixture<ClinicalPlacabolproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalPlacabolproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalPlacabolproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
