import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopGeneraldetailsComponent } from './drugshop-generaldetails.component';

describe('DrugshopGeneraldetailsComponent', () => {
  let component: DrugshopGeneraldetailsComponent;
  let fixture: ComponentFixture<DrugshopGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
