import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationprodRegDashboardComponent } from './variationprod-reg-dashboard.component';

describe('VariationprodRegDashboardComponent', () => {
  let component: VariationprodRegDashboardComponent;
  let fixture: ComponentFixture<VariationprodRegDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationprodRegDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationprodRegDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
