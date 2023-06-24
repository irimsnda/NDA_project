import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpComplaintFacilitiesComponent } from './gmp-complaint-facilities.component';

describe('GmpComplaintFacilitiesComponent', () => {
  let component: GmpComplaintFacilitiesComponent;
  let fixture: ComponentFixture<GmpComplaintFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpComplaintFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpComplaintFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
