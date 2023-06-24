import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpApplicationsAmendementsComponent } from './gmp-applications-amendements.component';

describe('GmpApplicationsAmendementsComponent', () => {
  let component: GmpApplicationsAmendementsComponent;
  let fixture: ComponentFixture<GmpApplicationsAmendementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpApplicationsAmendementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpApplicationsAmendementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
