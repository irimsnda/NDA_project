import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredVeterinaryproductsComponent } from './registered-veterinaryproducts.component';

describe('RegisteredVeterinaryproductsComponent', () => {
  let component: RegisteredVeterinaryproductsComponent;
  let fixture: ComponentFixture<RegisteredVeterinaryproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredVeterinaryproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredVeterinaryproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
