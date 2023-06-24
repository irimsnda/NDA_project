import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationpremisesDashboardComponent } from './variationpremises-dashboard.component';

describe('VariationpremisesDashboardComponent', () => {
  let component: VariationpremisesDashboardComponent;
  let fixture: ComponentFixture<VariationpremisesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationpremisesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationpremisesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
