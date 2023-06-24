import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimportProductsdetailsComponent } from './perimport-productsdetails.component';

describe('PerimportProductsdetailsComponent', () => {
  let component: PerimportProductsdetailsComponent;
  let fixture: ComponentFixture<PerimportProductsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerimportProductsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerimportProductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
