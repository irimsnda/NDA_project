import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreclinicaltrialSubmissionappComponent } from './preclinicaltrial-submissionapp.component';

describe('PreclinicaltrialSubmissionappComponent', () => {
  let component: PreclinicaltrialSubmissionappComponent;
  let fixture: ComponentFixture<PreclinicaltrialSubmissionappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreclinicaltrialSubmissionappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreclinicaltrialSubmissionappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
