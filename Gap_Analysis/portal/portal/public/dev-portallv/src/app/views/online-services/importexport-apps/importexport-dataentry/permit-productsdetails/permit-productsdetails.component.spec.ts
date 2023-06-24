import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitProductsdetailsComponent } from './permit-productsdetails.component';

describe('PermitProductsdetailsComponent', () => {
  let component: PermitProductsdetailsComponent;
  let fixture: ComponentFixture<PermitProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
