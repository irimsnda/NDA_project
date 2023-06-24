import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerauthorisationGeneraldetailsComponent } from './perauthorisation-generaldetails.component';

describe('PerauthorisationGeneraldetailsComponent', () => {
  let component: PerauthorisationGeneraldetailsComponent;
  let fixture: ComponentFixture<PerauthorisationGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerauthorisationGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerauthorisationGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
