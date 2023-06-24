import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAssessmentsappsComponent } from './assigned-assessmentsapps.component';

describe('AssignedAssessmentsappsComponent', () => {
  let component: AssignedAssessmentsappsComponent;
  let fixture: ComponentFixture<AssignedAssessmentsappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedAssessmentsappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedAssessmentsappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
