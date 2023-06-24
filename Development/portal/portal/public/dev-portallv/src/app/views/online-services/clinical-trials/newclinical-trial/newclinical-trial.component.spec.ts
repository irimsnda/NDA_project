import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewclinicalTrialComponent } from './newclinical-trial.component';

describe('NewclinicalTrialComponent', () => {
  let component: NewclinicalTrialComponent;
  let fixture: ComponentFixture<NewclinicalTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewclinicalTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewclinicalTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
