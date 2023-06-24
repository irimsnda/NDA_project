import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesStaffdetailsComponent } from './premises-staffdetails.component';

describe('PremisesStaffdetailsComponent', () => {
  let component: PremisesStaffdetailsComponent;
  let fixture: ComponentFixture<PremisesStaffdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesStaffdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesStaffdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
