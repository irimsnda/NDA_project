import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeddevGeneraldetailsComponent } from './meddev-generaldetails.component';

describe('MeddevGeneraldetailsComponent', () => {
  let component: MeddevGeneraldetailsComponent;
  let fixture: ComponentFixture<MeddevGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeddevGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeddevGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
