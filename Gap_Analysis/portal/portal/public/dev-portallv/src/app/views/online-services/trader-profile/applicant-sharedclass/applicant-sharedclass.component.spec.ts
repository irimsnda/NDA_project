import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSharedclassComponent } from './applicant-sharedclass.component';

describe('ApplicantSharedclassComponent', () => {
  let component: ApplicantSharedclassComponent;
  let fixture: ComponentFixture<ApplicantSharedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantSharedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSharedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
