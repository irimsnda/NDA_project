import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalImpproductsComponent } from './clinical-impproducts.component';

describe('ClinicalImpproductsComponent', () => {
  let component: ClinicalImpproductsComponent;
  let fixture: ComponentFixture<ClinicalImpproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalImpproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalImpproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
