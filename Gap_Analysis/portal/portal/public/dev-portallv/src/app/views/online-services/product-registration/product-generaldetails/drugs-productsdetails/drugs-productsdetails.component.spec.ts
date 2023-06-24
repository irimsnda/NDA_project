import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsProductsdetailsComponent } from './drugs-productsdetails.component';

describe('DrugsProductsdetailsComponent', () => {
  let component: DrugsProductsdetailsComponent;
  let fixture: ComponentFixture<DrugsProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
