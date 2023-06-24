import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedCosmeticsproductsComponent } from './authorised-cosmeticsproducts.component';

describe('AuthorisedCosmeticsproductsComponent', () => {
  let component: AuthorisedCosmeticsproductsComponent;
  let fixture: ComponentFixture<AuthorisedCosmeticsproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedCosmeticsproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedCosmeticsproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
