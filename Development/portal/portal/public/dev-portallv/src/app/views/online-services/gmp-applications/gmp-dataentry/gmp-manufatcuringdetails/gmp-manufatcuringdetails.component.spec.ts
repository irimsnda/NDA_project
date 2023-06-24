import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpManufatcuringdetailsComponent } from './gmp-manufatcuringdetails.component';

describe('GmpManufatcuringdetailsComponent', () => {
  let component: GmpManufatcuringdetailsComponent;
  let fixture: ComponentFixture<GmpManufatcuringdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpManufatcuringdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpManufatcuringdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
