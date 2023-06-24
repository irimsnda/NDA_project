import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugslicenseGendetailsComponent } from './controlleddrugslicense-gendetails.component';

describe('ControlleddrugslicenseGendetailsComponent', () => {
  let component: ControlleddrugslicenseGendetailsComponent;
  let fixture: ComponentFixture<ControlleddrugslicenseGendetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugslicenseGendetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugslicenseGendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
