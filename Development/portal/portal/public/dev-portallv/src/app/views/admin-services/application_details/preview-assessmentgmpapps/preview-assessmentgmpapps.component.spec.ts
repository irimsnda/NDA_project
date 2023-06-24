import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAssessmentgmpappsComponent } from './preview-assessmentgmpapps.component';

describe('PreviewAssessmentgmpappsComponent', () => {
  let component: PreviewAssessmentgmpappsComponent;
  let fixture: ComponentFixture<PreviewAssessmentgmpappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAssessmentgmpappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAssessmentgmpappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
