import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAssessmentmedicinesComponent } from './preview-assessmentmedicines.component';

describe('PreviewAssessmentmedicinesComponent', () => {
  let component: PreviewAssessmentmedicinesComponent;
  let fixture: ComponentFixture<PreviewAssessmentmedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAssessmentmedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAssessmentmedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
