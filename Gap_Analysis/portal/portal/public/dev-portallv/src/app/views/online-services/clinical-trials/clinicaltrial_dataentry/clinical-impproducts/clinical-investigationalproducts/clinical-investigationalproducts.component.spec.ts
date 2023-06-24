import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInvestigationalproductsComponent } from './clinical-investigationalproducts.component';

describe('ClinicalInvestigationalproductsComponent', () => {
  let component: ClinicalInvestigationalproductsComponent;
  let fixture: ComponentFixture<ClinicalInvestigationalproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalInvestigationalproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalInvestigationalproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
