import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedassessmentClassComponent } from './sharedassessment-class.component';

describe('SharedassessmentClassComponent', () => {
  let component: SharedassessmentClassComponent;
  let fixture: ComponentFixture<SharedassessmentClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedassessmentClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedassessmentClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
