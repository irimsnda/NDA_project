import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantInformationComponent } from './applicant-information.component';

describe('ApplicantInformationComponent', () => {
  let component: ApplicantInformationComponent;
  let fixture: ComponentFixture<ApplicantInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
