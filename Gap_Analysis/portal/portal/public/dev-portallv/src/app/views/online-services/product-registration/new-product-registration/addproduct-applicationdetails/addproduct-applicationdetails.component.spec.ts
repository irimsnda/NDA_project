import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductApplicationdetailsComponent } from './addproduct-applicationdetails.component';

describe('AddproductApplicationdetailsComponent', () => {
  let component: AddproductApplicationdetailsComponent;
  let fixture: ComponentFixture<AddproductApplicationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductApplicationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductApplicationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
