import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateNewproductListingComponent } from './initiate-newproduct-listing.component';

describe('InitiateNewproductListingComponent', () => {
  let component: InitiateNewproductListingComponent;
  let fixture: ComponentFixture<InitiateNewproductListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateNewproductListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateNewproductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
