import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalGeneraldetailsComponent } from './disposal-generaldetails.component';

describe('DisposalGeneraldetailsComponent', () => {
  let component: DisposalGeneraldetailsComponent;
  let fixture: ComponentFixture<DisposalGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
