import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesPersonneldetailsComponent } from './premises-personneldetails.component';

describe('PremisesPersonneldetailsComponent', () => {
  let component: PremisesPersonneldetailsComponent;
  let fixture: ComponentFixture<PremisesPersonneldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesPersonneldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesPersonneldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
