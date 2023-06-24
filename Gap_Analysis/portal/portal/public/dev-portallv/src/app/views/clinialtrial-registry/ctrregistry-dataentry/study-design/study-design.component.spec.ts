import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDesignComponent } from './study-design.component';

describe('StudyDesignComponent', () => {
  let component: StudyDesignComponent;
  let fixture: ComponentFixture<StudyDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
