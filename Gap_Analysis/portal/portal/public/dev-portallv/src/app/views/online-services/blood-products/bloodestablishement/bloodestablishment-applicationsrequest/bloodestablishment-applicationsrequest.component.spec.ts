import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodestablishmentApplicationsrequestComponent } from './bloodestablishment-applicationsrequest.component';

describe('BloodestablishmentApplicationsrequestComponent', () => {
  let component: BloodestablishmentApplicationsrequestComponent;
  let fixture: ComponentFixture<BloodestablishmentApplicationsrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodestablishmentApplicationsrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodestablishmentApplicationsrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
