import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugslicenseProdsdetailsComponent } from './controlleddrugslicense-prodsdetails.component';

describe('ControlleddrugslicenseProdsdetailsComponent', () => {
  let component: ControlleddrugslicenseProdsdetailsComponent;
  let fixture: ComponentFixture<ControlleddrugslicenseProdsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugslicenseProdsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugslicenseProdsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
