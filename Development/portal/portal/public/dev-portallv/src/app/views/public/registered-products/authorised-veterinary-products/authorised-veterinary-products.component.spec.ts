import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedVeterinaryProductsComponent } from './authorised-veterinary-products.component';

describe('AuthorisedVeterinaryProductsComponent', () => {
  let component: AuthorisedVeterinaryProductsComponent;
  let fixture: ComponentFixture<AuthorisedVeterinaryProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedVeterinaryProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedVeterinaryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
