import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerauthorisationProductsdetailsComponent } from './perauthorisation-productsdetails.component';

describe('PerauthorisationProductsdetailsComponent', () => {
  let component: PerauthorisationProductsdetailsComponent;
  let fixture: ComponentFixture<PerauthorisationProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerauthorisationProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerauthorisationProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
