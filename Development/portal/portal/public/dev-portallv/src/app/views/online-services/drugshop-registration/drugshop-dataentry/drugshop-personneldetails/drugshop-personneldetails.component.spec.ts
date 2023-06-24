import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopPersonneldetailsComponent } from './drugshop-personneldetails.component';

describe('DrugshopPersonneldetailsComponent', () => {
  let component: DrugshopPersonneldetailsComponent;
  let fixture: ComponentFixture<DrugshopPersonneldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopPersonneldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopPersonneldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
